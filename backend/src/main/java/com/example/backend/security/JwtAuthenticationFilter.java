package com.example.backend.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private JwtService jwtService;
    private UserDetailsService userDetails;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetails) {
        this.jwtService = jwtService;
        this.userDetails = userDetails;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain fChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
      
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            fChain.doFilter(request, response);
            return;
        }

        try {
            String token = authHeader.substring(7);
            String name = jwtService.getName(token);
            if (name != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails details = this.userDetails.loadUserByUsername(name);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        details, null, details.getAuthorities());
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception exception) {
          
            SecurityContextHolder.clearContext();
        }

        fChain.doFilter(request, response);
    }
}
