How to set up typscript working project with JS and only HTML -

1. In terminal , initialise project using tsc --init
2. Create 2 directories src and dist
3. Create index.ts in src and press tsc --watch in terminal
4. Change output path to ./dist and include src in tsconfig.json

if we want to reflect changes automatically in index.html file , we can run npm init command and install lite -server

with ts-node , it will compile ts file to js and it will run that js file in terminal like node index.js

in this project we are running lite runner to serve index.html locally
