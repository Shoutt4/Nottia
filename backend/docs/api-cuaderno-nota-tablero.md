# API REST — Cuaderno, Nota y Tablero

Documentación de los endpoints de las entidades `Cuaderno`, `Nota` y `Tablero` del backend
(Spring Boot, base package `com.example.backend`). Describe el contrato **tal como está
implementado hoy**, incluyendo rarezas y defectos conocidos, para que el frontend y las
pruebas manuales se ajusten a la realidad.

---

## 1. Generalidades

| Tema | Valor |
|---|---|
| URL base (dev) | `http://localhost:8080` |
| Prefijo de estos recursos | `/api/cuaderno`, `/api/notas`, `/api/tablero` |
| Autenticación | JWT en cabecera `Authorization: Bearer <token>` |
| Autorización | Todos los endpoints exigen `@PreAuthorize("hasRole('USUARIO')")` |
| Formato | JSON (`application/json`, UTF-8) |
| CORS | Orígenes permitidos: `http://localhost:5173`, `http://localhost:3000`; cabeceras `Authorization`, `Content-Type`, `Accept` |

### 1.1 Autenticación

- El token se obtiene en `POST /api/auth/login` (`AuthController`). El claim `id_usuario`
  del JWT es el que identifica al dueño de cuadernos, notas y tablero.
- `JwtAuthenticationFilter` valida el token de cada petición; si falta o es inválido, la
  petición termina en **401** (entry point de `SecurityConfig`).
- Varios métodos piden además la cabecera con `@RequestHeader("Authorization")` y el
  servicio hace `token.substring(7)`, así que **el valor debe empezar por `Bearer `**
  (con espacio). Enviar solo el token produce `500`.
- `POST /api/cuaderno/create` y `POST /api/notas/save` **no** reciben la cabecera en el
  controlador; el `idUsuario` viaja en el cuerpo. Aun así necesitan token válido porque
  la ruta está protegida por el filtro.

### 1.2 Paginación

Los endpoints que devuelven listas reciben el `Pageable` de Spring:

| Parámetro | Ejemplo | Defecto |
|---|---|---|
| `page` | `0` | `0` |
| `size` | `10` | `20` |
| `sort` | `createAt,desc` | sin ordenar |

La respuesta es un `Page<T>` serializado por Spring Data:

```json
{
  "content": [],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": { "sorted": false, "unsorted": true, "empty": true },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 0,
  "totalPages": 0,
  "last": true,
  "size": 20,
  "number": 0,
  "sort": { "sorted": false, "unsorted": true, "empty": true },
  "numberOfElements": 0,
  "first": true,
  "empty": true
}
```

### 1.3 Formato de errores

`GlobalExceptionHandler` solo cubre tres casos. **No** existe un formato de error único.

| Origen | HTTP real | Cuerpo |
|---|---|---|
| `ErrorGlobal` (errores de negocio) | **404 siempre** | `{ "succes": false, "code": <code>, "message": "<texto>" }` |
| `authExceotion` | el `status` de la excepción | `{ "message": ..., "status": ..., "succes": false }` |
| Fallo de bean validation | `400` | `{ "message": "errores de campo", "error": { "<campo>": "<mensaje>" } }` |
| `IllegalStateException` | **500** | página de error por defecto de Spring |
| `NullPointerException`, `ConstraintViolationException`, `TransactionRequiredException`, etc. | **500** | página de error por defecto de Spring |

> **Importante:** el `code` que se ve en el cuerpo **no** es el código HTTP. Por ejemplo
> `{"succes":false,"code":403,"message":"No existen cuadernos creados para este usuario"}`
> llega con **HTTP 404**. No programes el cliente mirando `code` como si fuera el status.

### 1.4 Validación

- Los DTO de entrada **no tienen ninguna anotación de `jakarta.validation`**, por lo que
  `@Valid` no rechaza nada: campos ausentes llegan como `null` / `false` / `0`.
- Los únicos límites reales están en las entidades (`@Size`) y se evalúan al persistir
  (Hibernate Validator): `Cuaderno.nombre` ≤ 80, `Cuaderno.color` ≤ 20,
  `Nota.titulo` ≤ 200. Al violarse se produce un `500`.

### 1.5 Decisiones de diseño relevantes

- **202 Accepted** es el status de casi todas las lecturas y de la mayoría de escrituras
  (`GET`, `PUT`, `POST /api/notas/save`). Solo `POST /api/cuaderno/create` devuelve 201,
  y los `DELETE` y `PUT /api/tablero/update` devuelven 200.
- La pertenencia se resuelve **siempre** por el `idUsuario` del JWT, no por lo que envíe
  el cliente (salvo en los dos `POST` de creación, que confían en el cuerpo).

---

## 2. Modelo de datos

### 2.1 `Cuaderno` → tabla `cuaderno_nnt`

| Campo Java | Columna | Tipo | Notas |
|---|---|---|---|
| `idCuader` | `id_cuaderno` | `String` (UUID) | `@GeneratedValue(strategy = UUID)`; el nombre del atributo está escrito así, con la errata |
| `idUsuario` | `id_usuario` | `Usuario` (`@ManyToOne`, LAZY) | **`cascade = CascadeType.ALL`** hacia `usuario_ann` |
| `nombre` | `nombre` | `String` | `@Size(max = 80)` |
| `color` | `color` | `String` | `@Size(max = 20)` (se suele usar el hex `#RRGGBB`) |
| `orden` | `orden` | `int` | Posición en la lista |
| `createAt` | `create_at` | `Timestamp` | `@CreationTimestamp` |
| `updateAt` | `update_at` | `Timestamp` | `@UpdateTimestamp` |

### 2.2 `Nota` → tabla `nota`

| Campo Java | Columna | Tipo | Notas |
|---|---|---|---|
| `idNota` | `id_nota` | `String` (UUID) | `@GeneratedValue(strategy = UUID)` |
| `iCuaderno` | `id_cuaderno` | `Cuaderno` (`@ManyToOne`, LAZY) | Getter `getICuaderno()`, propiedad `ICuaderno` |
| `idUsuario` | `id_usuario` | `Usuario` (`@ManyToOne`, LAZY) | Sin cascade |
| `titulo` | `titulo` | `String` | `@Size(max = 200)` |
| `contenido` | `contenido` | `String` | columna `TEXT` |
| `bloqueado` | `bloqueado` | `boolean` | |
| `fijado` | `fijado` | `boolean` | |
| `createAt` | `create_at` | `java.security.Timestamp` | Declarado con el tipo equivocado y **sin** `@CreationTimestamp`; nunca se rellena |
| `updateAt` | `update_at` | `java.security.Timestamp` | Igual: nunca se rellena |

### 2.3 `Tablero` → tabla `tablero`

| Campo Java | Columna | Tipo | Notas |
|---|---|---|---|
| `idTablero` | `id_tablero` | `String` | `@Id` **sin** `@GeneratedValue` (el id se debe asignar a mano) |
| `idUsuario` | `id_usuario` | `Usuario` (`@OneToOne`, LAZY) | **`cascade = CascadeType.ALL`**; sin `@OneToOne(mappedBy=...)`, así que la unicidad la impone el `JoinColumn` |
| `titulo` | `titulo` | `String` | |
| `tipoPortada` | `tipo_portada` | `String` | p. ej. `gradient` / `image` |
| `portadaValor` | `portada_valor` | `String` | p. ej. `preset:lavanda` o un data URL |
| `createAt` | `create_at` | `java.security.Timestamp` | Nunca se rellena |
| `updateAt` | `update_at` | `java.security.Timestamp` | Nunca se rellena |

### 2.4 Relaciones

```
usuario_ann (Usuario)
  ├── 1..N cuaderno_nnt   (Cuaderno.id_usuario)
  ├── 1..N nota           (Nota.id_usuario)
  └── 1..1 tablero        (Tablero.id_usuario)

cuaderno_nnt
  └── 1..N nota           (Nota.id_cuaderno)
```

---

## 3. API de Cuaderno

Controlador: `controller/cuaderno/CuadernoController.java` → `/api/cuaderno`
Servicio: `service/cuaderno/CuadernoService.java`
Mapper: `mapper/cuaderno/CuadernoResponseMapper.java` (MapStruct)

### 3.1 Resumen

| Método | Ruta | Éxito | Cuerpo de entrada | Cuerpo de salida |
|---|---|---|---|---|
| `GET` | `/api/cuaderno/all` | 202 | — | `Page<CuadernoResponseDTO>` |
| `GET` | `/api/cuaderno/byUser/{id}` | 202 | — | `CuadernoResponseDTO` |
| `POST` | `/api/cuaderno/create` | 201 | `CuadernoRequestDTO` | `CuadernoResponseDTO` |
| `PUT` | `/api/cuaderno/update/{idCuaderno}` | 202 | `CuadernoRequestDTO` | `CuadernoResponseDTO` |

### 3.2 Esquemas

`CuadernoRequestDTO`

```json
{
  "idUsuario": "b1f0...-uuid",
  "nombre": "Universidad",
  "color": "#8b7cf6",
  "orden": 0
}
```

`CuadernoResponseDTO`

```json
{
  "idCuader": "3a9c...-uuid",
  "idUsuario": "b1f0...-uuid",
  "nombre": "Universidad",
  "color": "#8b7cf6",
  "orden": 0,
  "createAt": "2026-10-27T10:15:32.123+00:00",
  "updateAt": "2026-10-27T10:15:32.123+00:00"
}
```

> El identificador se llama **`idCuader`** (no `idCuaderno`) en la respuesta y en la
> entidad. En la ruta del `PUT` sí se llama `idCuaderno`. Mantén la errata en el cliente.

### 3.3 `GET /api/cuaderno/all`

Lista paginada de los cuadernos del usuario del token.

- **Cabecera:** `Authorization: Bearer <token>` (obligatoria).
- **Query:** `page`, `size`, `sort`.
- **200/202:** `Page<CuadernoResponseDTO>` con los cuadernos del usuario.
- **404:** `{"succes":false,"code":403,"message":"No existen cuadernos creados para este usuario"}`
  cuando el usuario no tiene ninguno (nota: el body dice 403, el HTTP es 404).
- El orden depende de `sort`; sin `sort`, el que devuelva la base de datos.

### 3.4 `GET /api/cuaderno/byUser/{id}`

Devuelve **un cuaderno por su id**, no los del usuario (a pesar del nombre de la ruta).

- **Path param:** `id` = `id_cuaderno`.
- **Cabecera:** `Authorization: Bearer <token>`.
- **202:** `CuadernoResponseDTO` si el cuaderno existe **y** pertenece al usuario del token.
- **404:** `{"succes":false,"code":404,"message":"cuaderno no existente"}` si no existe o
  es de otro usuario (no distingue entre ambos casos).

### 3.5 `POST /api/cuaderno/create`

Crea un cuaderno.

- **Cabecera:** token válido (la ruta está protegida aunque el método no lea la cabecera).
- **Cuerpo:** `CuadernoRequestDTO`. `idUsuario` es **obligatorio** y se busca en
  `usuario_ann`; `nombre`, `color`, `orden` se copian tal cual (sin validar).
- **201:** `CuadernoResponseDTO` recién creado (`idCuader` generado, `createAt`/`updateAt`
  rellenos por Hibernate).
- **500:** `IllegalStateException("error el usuario no existe")` si `idUsuario` no existe
  o no se envía.

```bash
curl -X POST http://localhost:8080/api/cuaderno/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"idUsuario":"'"$ID_USER"'","nombre":"Universidad","color":"#8b7cf6","orden":0}'
```

### 3.6 `PUT /api/cuaderno/update/{idCuaderno}`

Actualiza un cuaderno propio.

- **Path param:** `idCuaderno` = `id_cuaderno`.
- **Cabecera:** `Authorization: Bearer <token>`.
- **Cuerpo:** `CuadernoRequestDTO`.
  - `nombre`, `color` y `orden` se aplican con `NullValuePropertyMappingStrategy.IGNORE`:
    un `null` deja el valor anterior. `orden` es `int` primitivo, así que si no se envía
    llega como `0` y **sí** sobrescribe.
  - `idUsuario` **se ignora al guardar** (el mapper lo excluye): solo se comprueba que
    exista. No se puede transferir el cuaderno a otro usuario por esta vía.
  - `idCuader` no se toca.
- **202:** `CuadernoResponseDTO` actualizado.
- **404:** `{"succes":false,"code":404,"message":"cuaderno no existe con esas eespecificaciones"}`
  (errata incluida) si el cuaderno no existe o no es del usuario.
- **500:** `IllegalStateException("el usuario no existe")` si el `idUsuario` del cuerpo no
  existe.

```bash
curl -X PUT http://localhost:8080/api/cuaderno/update/$ID_CUADERNO \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"idUsuario":"'"$ID_USER"'","nombre":"Trabajo","color":"#22c55e","orden":2}'
```

---

## 4. API de Nota

Controlador: `controller/notas/NotasController.java` → `/api/notas`
Servicio: `service/notas/NotasService.java`
Mappers: `mapper/nota/NotaMapper.java` (update manual) y `mapper/nota/SaveNotaMapper.java` (alta)

### 4.1 Resumen

| Método | Ruta | Éxito | Cuerpo de entrada | Cuerpo de salida |
|---|---|---|---|---|
| `GET` | `/api/notas/all` | 202 | — | `Page<NotasResponse>` |
| `GET` | `/api/notas/{id}` | 202 | — | `NotasResponse` |
| `POST` | `/api/notas/save` | 202 | `SaveNotaRequestDTO` | `{ "Succes": true, "data": NotasResponse }` |
| `PUT` | `/api/notas/update/{id}` | 202 | `NotasRequestDTO` | `NotasResponse` |
| `DELETE` | `/api/notas/delete/{id}` | 200 | — | `{ "succes": true, "cantidad eliminada": <int> }` |

### 4.2 Esquemas

`SaveNotaRequestDTO` (alta)

```json
{
  "idCuaderno": "3a9c...-uuid",
  "idUsuario": "b1f0...-uuid",
  "titulo": "Apuntes de cálculo",
  "contenido": "Texto plano o markdown",
  "bloqueado": false,
  "fijado": false
}
```

`NotasRequestDTO` (actualización) tiene exactamente los mismos campos.

`NotasResponse`

```json
{
  "idNota": "9f21...-uuid",
  "idCuaderno": "3a9c...-uuid",
  "idUsuario": "b1f0...-uuid",
  "titulo": "Apuntes de cálculo",
  "contenido": "Texto plano o markdown",
  "bloqueado": false,
  "fijado": false,
  "createAt": null,
  "updateAt": null
}
```

> `createAt` y `updateAt` salen **siempre en `null`**: la entidad los declara como
> `java.security.Timestamp` y no tiene `@CreationTimestamp`/`@UpdateTimestamp`, y los
> mappers los ignoran. El cliente debe usar su propia noción de fecha o no mostrarla.

### 4.3 `GET /api/notas/all`

Notas del usuario paginadas.

- **Cabecera:** `Authorization: Bearer <token>`.
- **Query:** `page`, `size`, `sort`.
- **202:** `Page<NotasResponse>`.
- **404:** `{"succes":false,"code":404,"message":"usuario sin notas"}` si el usuario no
  tiene ninguna nota.

### 4.4 `GET /api/notas/{id}`

Detalle de una nota.

- **Path param:** `id` = `id_nota`.
- **Cabecera:** `Authorization: Bearer <token>`.
- **202:** `NotasResponse` si la nota es del usuario.
- **404:** `{"succes":false,"code":403,"message":"no existe ninguna nota con las especificaciones"}`
  si el id no existe.
- **404:** `{"succes":false,"code":404,"message":"el recurso no pertenece a este usuario"}`
  si el usuario no tiene **ninguna** nota.
- **500:** si la nota existe pero pertenece a otro usuario y el llamante sí tiene notas:
  la consulta `findByIdNotaAndIdUsuario_IdUsuario` devuelve `null` y el servicio lanza
  `NullPointerException` al mapear.

### 4.5 `POST /api/notas/save`

Crea una nota.

- **Cabecera:** token válido (el método no lee la cabecera, pero la ruta está protegida).
- **Cuerpo:** `SaveNotaRequestDTO`.
  - `idCuaderno` **debe existir**; si no, error. No comprueba que el cuaderno sea del
    `idUsuario` enviado.
  - `idUsuario` **debe existir** (lo exige la FK); no se contrasta con el JWT.
  - `bloqueado` y `fijado` son primitivos: ausentes ⇒ `false`.
- **202:** `{"Succes": true, "data": { ...NotasResponse... }}`
  (la clave va con **S** mayúscula; el resto de endpoints usa `succes` en minúscula).
- **404:** `{"succes":false,"code":404,"message":"no existe cuaderno con id : <id>"}`.
- **500:** si `idUsuario` no existe (violación de FK) o si se supera `titulo` > 200.

```bash
curl -X POST http://localhost:8080/api/notas/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"idCuaderno":"'"$ID_CUADERNO"'","idUsuario":"'"$ID_USER"'",
       "titulo":"Nueva nota","contenido":"","bloqueado":false,"fijado":false}'
```

### 4.6 `PUT /api/notas/update/{id}`

Actualiza una nota existente.

- **Path param:** `id` = `id_nota`.
- **Cabecera:** `Authorization: Bearer <token>`.
- **Cuerpo:** `NotasRequestDTO`.
  - `titulo`, `contenido`, `bloqueado`, `fijado` se aplican (`null` en los textos deja el
    valor anterior; los booleanos primitivos siempre se sobrescriben, `false` si se omiten).
  - `idCuaderno` **solo se valida** (debe existir); **no** mueve la nota de cuaderno
    (`iCuaderno` está ignorado en el mapper).
  - `idUsuario` **sí se aplica** sin comprobar pertenencia: si se envía, la nota cambia de
    dueño (o falla con 500 si el id no existe). Enviarlo en `null` la deja como está.
  - `idNota` no se toca.
- **202:** `NotasResponse` actualizada.
- **404:** `{"succes":false,"code":403,"message":"no existe una nota con id : <id>"}`.
- **404:** `{"succes":false,"code":403,"message":"no existe un cuaderno con el id : <idCuaderno>"}`.
- **500:** si la nota existe pero es de otro usuario (se mapea sobre `null`).

### 4.7 `DELETE /api/notas/delete/{id}`

Borra una nota del usuario.

- **Path param:** `id` = `id_nota`.
- **Cabecera:** `Authorization: Bearer <token>`.
- **200:** `{"succes": true, "cantidad eliminada": 1}` (`0` si el `id` no era suyo, pero
  entonces entra por la rama de error).
- **404:** `{"succes":false,"code":404,"message":"nota no ecnotnrado con las especificaciones"}`
  (errata incluida) si la nota no existe o no es del usuario.

```bash
curl -X DELETE http://localhost:8080/api/notas/delete/$ID_NOTA \
  -H "Authorization: Bearer $TOKEN"
```

---

## 5. API de Tablero

Controlador: `controller/tablero/TableroController.java` → `/api/tablero`
Servicio: `service/tablero/TableroService.java`
Mapper: `mapper/tablero/UpdateMapper.java`

Un usuario tiene **como máximo un tablero** (`@OneToOne` desde `Tablero` a `Usuario`).
No hay endpoint de creación: el registro debe existir previamente en la tabla `tablero`
(insertado a mano, porque `idTablero` no se genera automáticamente).

### 5.1 Resumen

| Método | Ruta | Éxito | Cuerpo de entrada | Cuerpo de salida |
|---|---|---|---|---|
| `GET` | `/api/tablero/byme` | 202 | — | `ResponseTableroAllDTO` |
| `PUT` | `/api/tablero/update` | 200 | `RequestTableroAllDTO` | `{ "succes": true, "data": ResponseTableroAllDTO }` |
| `DELETE` | `/api/tablero/delete` | 200 | — | `{ "succes": true, "cantidad eliminada": <int> }` |

### 5.2 Esquemas

`RequestTableroAllDTO`

```json
{
  "idUsuario": { "idUsuario": "b1f0...-uuid" },
  "titulo": "Mi tablero",
  "tipoPortada": "gradient",
  "portadaValor": "preset:lavanda"
}
```

> `idUsuario` está tipado como la **entidad `Usuario` completa**, no como `String`; el
> serializador espera un objeto. En la práctica el mapper lo ignora, así que puede
> enviarse `null` (o incluso omitirse).

`ResponseTableroAllDTO`

```json
{
  "idTablero": "t-001",
  "idUsuario": "b1f0...-uuid",
  "titulo": "Mi tablero",
  "tipoPortada": "gradient",
  "portadaValor": "preset:lavanda",
  "createAt": null,
  "updateAt": null
}
```

### 5.3 `GET /api/tablero/byme`

Devuelve el tablero del usuario del token.

- **Cabecera:** `Authorization: Bearer <token>`.
- **202:** `ResponseTableroAllDTO`.
- **404:** `{"succes":false,"code":404,"message":"tablero no existente para este usuario"}`.

```bash
curl http://localhost:8080/api/tablero/byme -H "Authorization: Bearer $TOKEN"
```

### 5.4 `PUT /api/tablero/update`

Actualiza el tablero del usuario.

- **Cabecera:** `Authorization: Bearer <token>`.
- **Cuerpo:** `RequestTableroAllDTO`.
- **200:** `{"succes": true, "data": { ...ResponseTableroAllDTO... }}`.
- **404:** `{"succes":false,"code":404,"message":"NO EXISTE TABLERO PARA ESTE USUARIO"}`.

> **Defecto conocido:** `updateMapper.updateTablero(dto)` construye una entidad nueva que
> **nunca se usa**; el servicio guarda el tablero cargado sin modificarlo. Consecuencia:
> el endpoint responde 200 pero **no actualiza nada** y devuelve los valores anteriores.
> Ni `titulo` ni `tipoPortada` ni `portadaValor` se persisten.

### 5.5 `DELETE /api/tablero/delete`

Borra el tablero del usuario.

- **Cabecera:** `Authorization: Bearer <token>`.
- **200:** `{"succes": true, "cantidad eliminada": 1}`.
- **404:** `{"succes":false,"code":404,"message":"tablero no encontrado"}`.
- **Riesgo:** el método del repositorio es un `delete` derivado con `@Modifying` y el
  servicio **no está anotado con `@Transactional`**, por lo que es esperable un **500**
  (`TransactionRequiredException`). Además, `Tablero → Usuario` usa
  `cascade = CascadeType.ALL`, así que el borrado podría propagarse al usuario.

---

## 6. Matriz de permisos y pertenencia

| Recurso | ¿Quién puede leerlo? | ¿Quién puede modificarlo? | ¿De dónde sale el dueño? |
|---|---|---|---|
| Cuaderno | Solo el dueño | Solo el dueño | Claim `id_usuario` del JWT (el `idUsuario` del `PUT` se ignora) |
| Nota | Solo el dueño | Solo el dueño | Claim `id_usuario` del JWT en `GET`/`PUT`/`DELETE`; **cuerpo** en `POST /save` |
| Tablero | Solo el dueño | Solo el dueño | Claim `id_usuario` del JWT |

---

## 7. Gotchas y comportamiento no obvio

1. **`idCuader`, no `idCuaderno`**, en `CuadernoResponseDTO` y en la entidad.
2. **HTTP 404 para casi todo error de negocio**, aunque el cuerpo diga `code: 403`.
3. **`202 Accepted`** en lecturas y en la mayoría de escrituras; el cliente no debe exigir 200.
4. **`"Succes"`** (mayúscula) en el `POST /api/notas/save`; `"succes"` (minúscula) en los `DELETE`.
5. **Sin endpoint para crear un tablero** y `idTablero` no se autogenera.
6. **`PUT /api/tablero/update` no persiste cambios** (mapper descartado).
7. **`PUT /api/notas/update/{id}` no cambia de cuaderno** pero **sí puede cambiar de dueño**
   (`idUsuario`).
8. **`createAt`/`updateAt` nulos** en `Nota` y `Tablero` por usar `java.security.Timestamp`
   sin anotaciones de auditoría.
9. **`GET /api/cuaderno/byUser/{id}`** recibe el id del *cuaderno*, no del usuario.
10. **`GET /api/notas/{id}` y `PUT /api/notas/update/{id}`** pueden devolver 500 en vez de
    404 cuando la nota pertenece a otro usuario.
11. `Cuaderno.idUsuario` y `Tablero.idUsuario` usan **`cascade = ALL`** hacia `Usuario`:
    cualquier operación de persistencia/merge arrastra al usuario y un borrado podría
    intentar borrarlo.
12. Los listados fallan con 404 si el usuario **no tiene ningún registro**; no devuelven
    una página vacía. El frontend debe tratar ese 404 como lista vacía.

---

## 8. Flujo típico (ejemplo completo)

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"secreto"}' | jq -r .token)

ID_USER=$(echo "$TOKEN" | cut -d. -f2 | base64 -d 2>/dev/null | jq -r .id_usuario)

# 2. Crear un cuaderno
CUADERNO=$(curl -s -X POST http://localhost:8080/api/cuaderno/create \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"idUsuario":"'"$ID_USER"'","nombre":"Universidad","color":"#8b7cf6","orden":0}')
ID_CUADERNO=$(echo "$CUADERNO" | jq -r .idCuader)

# 3. Listar cuadernos (paginado)
curl -s "http://localhost:8080/api/cuaderno/all?page=0&size=20&sort=orden,asc" \
  -H "Authorization: Bearer $TOKEN"

# 4. Crear una nota dentro del cuaderno
NOTA=$(curl -s -X POST http://localhost:8080/api/notas/save \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"idCuaderno":"'"$ID_CUADERNO"'","idUsuario":"'"$ID_USER"'",
       "titulo":"Primera nota","contenido":"Hola","bloqueado":false,"fijado":true}')
ID_NOTA=$(echo "$NOTA" | jq -r .data.idNota)

# 5. Editar la nota (recordar que idCuaderno no la mueve de cuaderno)
curl -s -X PUT "http://localhost:8080/api/notas/update/$ID_NOTA" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"idCuaderno":"'"$ID_CUADERNO"'","idUsuario":"'"$ID_USER"'",
       "titulo":"Primera nota (editada)","contenido":"Hola mundo","bloqueado":false,"fijado":true}'

# 6. Tablero del usuario
curl -s http://localhost:8080/api/tablero/byme -H "Authorization: Bearer $TOKEN"

# 7. Borrar la nota
curl -s -X DELETE "http://localhost:8080/api/notas/delete/$ID_NOTA" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 9. Archivos de referencia

| Capa | Cuaderno | Nota | Tablero |
|---|---|---|---|
| Controlador | `controller/cuaderno/CuadernoController.java` | `controller/notas/NotasController.java` | `controller/tablero/TableroController.java` |
| Servicio | `service/cuaderno/CuadernoService.java` | `service/notas/NotasService.java` | `service/tablero/TableroService.java` |
| Repositorio | `repository/cuaderno/CuadernoRepository.java` | `repository/notas/NotasRepository.java` | `repository/tablero/TableroRepository.java` |
| Entidad | `entity/Cuaderno.java` | `entity/Nota.java` | `entity/Tablero.java` |
| DTO | `dtos/cuaderno/*.java` | `dtos/notas/*.java` | `dtos/tablero/*.java` |
| Mapper | `mapper/cuaderno/CuadernoResponseMapper.java` | `mapper/nota/NotaMapper.java`, `SaveNotaMapper.java` | `mapper/tablero/UpdateMapper.java` |
