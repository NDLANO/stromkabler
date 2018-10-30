# NDLA_ProteinStivelse

719 NDLA Labøvelser Protein og stivelse

# Environment setup

The webapp is built with the [Vue.js framework](https://vuejs.org/) using the [vue-cli 2](https://github.com/vuejs/vue-cli/tree/master) webpack setup.

## Working with the github repository

A nice tool to use for working with the git repository is [Sourcetree](https://www.sourcetreeapp.com/). Command line can of course also be used :)

**NB! When cloning the repository, make sure to put it in a directory path without spaces, since Webpack doesn´t like spaces in the path.**

The repo is set up with a develop branch in addition to the master branch. For day to day development you should use the development branch.

## Installing the necessary node modules

After cloning the repo, you need to open command line and run `npm install` (or `yarn install` if using yarn instead of npm).

This will install the necessary node modules.

## Running the dev-server and using build commands

In command line the following commands can be used:

`npm run dev` - This will start the web server on http://localhost:8080. If another server is running on port 8080, it will start on 8081.

The development server will run in memory and live update when you update the code

`npm run build_nb` and `npm run build_nn` - This will build the webapp and put the files in `/dist`. Each language version will be put in its own language folder.

`npm run build_dep_nb` and `npm run build_dep_nn` - This will build the app and when finished, upload the files to a server by ftp. The file can be viewed through h5p.org iframe from [https://h5p.org/node/271109](https://h5p.org/node/271109). The version ending with nb builds the bokmål version and the one ending with nn the nynorsk version. Both will be copied to the same h5p node overwriting any other version published there.

# Source structure

The main project folders are these:

`dist` - Contains the result of a build

`src` - **All Vue.js source code.** When the project is built, webpack will start with main.js and generate new javascript files based on the files that are used in this file and it´s imported files and child components. Files that are not used will not be part of the build.

`static` - If you want to link files (CSS, Javascript, images) from index.html instead of including them in the Vue source code they can be put here.
