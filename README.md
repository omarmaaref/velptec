# Velptec Test

## Aufgabe 1 – Bewertungssystem entwerfen (Datenmodell + API-Design)
Please check the following link:
🔗 [Miro Board](https://miro.com/app/board/uXjVI3kdmY8=/?share_link_id=292243958570)

## Aufgabe 2 – Datenvalidierung mit DTOs & Pipes (Konzept + Code)
+UTs
check the the commit (with name Aufgabe 2)

## Aufgabe 3 – Optional: JWT-Check via Interceptor (Token-Präsenz + Validierung)
(check ) I did implement an interceptor that performs pre-checking and added a UTs to test it.

PS: Honestly, I'm a bit confused because , but in NestJS, interceptors are triggered after guards,
which guards will do all the work and then the token pre validation interceptor would be unnecessary,
A more appropriate solution might be to use a middleware for initial token pre-validation, and then let the guard handle the full validation afterward.


