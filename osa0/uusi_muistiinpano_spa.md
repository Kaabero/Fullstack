
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
    activate server
    
    Note right of browser: The browser sends note (Content Type JSON) whit content and date
    
    server-->>browser: HTTP Status Code 201 Created 
    deactivate server
    
    
    
     
```
