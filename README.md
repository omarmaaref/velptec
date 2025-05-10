# Velptec Test
Hello Velptec,
to help you understand my work,
I tried to put each aufgabe as a seperate commit,
so check commit history to follow along & not get confused.

to run the nest backend : npm run start

## Aufgabe 1 – Bewertungssystem entwerfen (Datenmodell + API-Design)
Please check the following link:
🔗 [Miro Board](https://miro.com/app/board/uXjVI3kdmY8=/?share_link_id=292243958570)

## Aufgabe 2 – Datenvalidierung mit DTOs & Pipes (Konzept + Code)
+UTs
check the the commit (with name Aufgabe 2)

Optional: Wie würdest du die Fehlermeldungen so strukturieren, dass sie nutzerfreundlich?
===> normally exceptions in the DTO validations are returned as a list of raw messages, to make it frontend friendly
we should highlight the invalid properties for the frontend
using a custom exceptionFactory:


## Aufgabe 3 – Optional: JWT-Check via Interceptor (Token-Präsenz + Validierung)
(check ) I did implement an interceptor that performs pre-checking and added a UTs to test it.
+UTs

PS: Honestly, I'm a bit confused because , but in NestJS, interceptors are triggered after guards,
which means guards will do all the work and then the token pre validation interceptor would be unnecessary,
A more appropriate solution might be to use a Nest middleware for initial token pre-validation, and then let the guard handle the full validation afterward.


