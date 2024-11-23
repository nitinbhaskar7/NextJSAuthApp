First Project using TS 

In nextjs we have two parts -> frontend and backend

Whenever we write frontend we will be writing it in the page.tsx file and whenever we write backend we will be writing it in the route.ts file inside the api folder

layout.tsx is like a wrapper just to have a common structure for all the pages 

we are using src directory 

Dependencies:

```
npm i axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose 
```


FOLDER BASED Routing 

In nextjs we have a folder based routing system.

so we will make api calls(backend) at all endpoints starting with /api 

Since Next is a framework we have to strictly follow the folder structure and file naming conventions like page.tsx , route.ts , not-found.tsx and middleware.ts 

NEXT is a edge based framework which means it will render the page on the server and then send it to the client so it won't be always connected to the database. It might need to reconnect multiple times 


Dynamic ROUTING -> user/[id]/page.tsx 

To access the id we can use {params} in the function


Models 


We will later understand the use of tokens in user for verifying and password reset

also while exporting any model in Next check if it is already defined or not because if it is already defined then it will throw an error