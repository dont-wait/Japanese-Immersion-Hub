package com.minori.server.repository;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.minori.server.dto.response.auth.OutboundUserResponse;

@FeignClient(name = "outbound-user-client", url = "https://www.googleapis.com")
public interface OutboundUserClient {
    @GetMapping(value = "/oauth2/v3/userinfo")
    OutboundUserResponse getUserInfo(@RequestParam("access_token") String accessToken);
}
