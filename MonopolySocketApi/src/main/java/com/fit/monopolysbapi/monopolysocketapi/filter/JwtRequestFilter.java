package com.fit.monopolysbapi.monopolysocketapi.filter;

import com.fit.monopolysbapi.monopolysocketapi.config.SecurityConfig;
import com.fit.monopolysbapi.monopolysocketapi.model.User;
import com.fit.monopolysbapi.monopolysocketapi.util.JwtUtil;
import com.fit.monopolysbapi.monopolysocketapi.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        for (String path : SecurityConfig.PUBLIC_RESOURCES) {
            if (new AntPathMatcher().match(path, request.getServletPath())) return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestToken = request.getHeader("Authorization");
        String secWebsocketProtocol = request.getHeader("sec-websocket-protocol");
        if (requestToken==null && secWebsocketProtocol!=null){
            requestToken = request.getParameter("Authorization");
        }
        String id = null;
        String jwtToken = null;
        if (requestToken != null && requestToken.startsWith("Bearer ")) {
            jwtToken = requestToken.substring(7);
            id = jwtUtil.getIdFromToken(jwtToken);
        } else logger.warn("JWT does not begin with Bearer");
        if (id != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.getUserById(id).orElseThrow(() -> new UsernameNotFoundException("Username not found!"));
            if (user != null && jwtUtil.validateToken(jwtToken, user)) {
                if (user.getUsername()==null) user.setUsername(user.getEmail());
                System.out.println(user);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
