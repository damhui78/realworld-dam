package com.lodny.realworlddam.system;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RealException.class)
    public ResponseEntity<?> handleRealException(RealException e) {
        log.info("handleRealException() : e = " + e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RealExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<?> handleException(Exception e) {
        log.info("handleException() : e = " + e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RealExceptionResponse(e.getMessage()));
    }

}
