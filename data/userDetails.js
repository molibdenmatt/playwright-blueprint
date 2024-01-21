export const adminDetails = {
  username: "admin",
  password: process.env.ADMIN_PASSWORD,
};

/* 
ENV VARIABLES named in uppercase ADMIN_PASSWORD
To set the env during execution:
ADMIN_PASSWORD=Admin123 npm test
Or import dotenv in the spec file like my_account.spec.js
*/
