# SQL Editor (Atlan Task)

This frontend application has the ability to select or import a database and perform various SQL queries on its table. It has a editor area that takes in user SQL input and generates the corresponding table and displays it in an organised way. It has features to save , share, copy and build custom queries. Users also have an access to saved pre-defined queries, history of queries used and shared queries.  

###  Link to the deployed app 
[Atlan Project Link](https://62add181b37d4a7c6399cda4--curious-seahorse-4ca5a6.netlify.app/)
## Features

 - Selecting any table from the side bar displays all the queries related to this table that were saved, shared or accessed before
 - Editor has a tool bar with options to copy, save, share , download queries. It also has a feature to build custom query.
 - Editor offers a console that displays the query run time and status code
 - Table view has features to copy related json data and share queries table.
 - Table has features to custom select rows, sort columns, increase column width and rows displayed per page  


## Libraries used
1) **React** : React framework was used to build the UI
2) **react-router-dom** : To set up basic routing ans links
3)  **@tippyjs/react** : For setting up tooltips with ease
4)  **@mui/x-data-grid** and **@mui/material** : This was the main library used for displaying the data in a tabular format dynamically. Also used for creating custom Modals

## Load and render speed
### Initial Performance Test
It was done with the help of React Dev Tools extension's **Profiler tool**.  The React profiler collects information in the commit phase and groups the performance info by a commit. The commits are displayed in a bar chart .

 - Initial test revealed slow render of DataGrid Component (**22.1 ms**).
 ###
 ###

 ![PageSpeed Insights - Google Chrome 6_18_2022 7_22_28 PM](https://user-images.githubusercontent.com/88769060/174441796-c9b6e528-674d-4d44-89af-50dbe87c61bd.png)
 - This was solved using a simple optimization - not rendering the DataGrid Component on page load as it has no use initially. This improved the max component render rank to **8.8 ms**
###
###

 ![SQL editor - Google Chrome 6_18_2022 4_44_23 PM](https://user-images.githubusercontent.com/88769060/174441911-b3c98e14-9ea9-4c87-89ac-c892cefe3810.png)

### Google PageSpeed Insights
This uses the Lighthouse Performance scoring to calculate the overall performance of a webpage. The app scored a decent 92 % . Below are the Insights
###
![PageSpeed Insights - Google Chrome 6_18_2022 7_13_18 PM (2)](https://user-images.githubusercontent.com/88769060/174442200-7a5b14bd-b7c5-4a2c-9104-f86ea3da1d3f.png)

###

###
## Optimizations

1) **Row Virtualization in Data-Grid**  : The grid is high performing thanks to its rows and columns virtualization engine. DOM virtualization is the feature that allows the grid to handle an unlimited number of rows and columns. This is a built-in feature of the rendering engine and greatly improves rendering performance.

	Row virtualization is the insertion and removal of rows as the grid scrolls vertically.
The grid renders twice as many rows as are visible. It isn't configurable yet. Row virtualization is limited to 100 rows in the  `DataGrid`  component. This greatly impacts the performance of this app as the app constantly renders and re-renders hundreads of rows and columns of data dynamically.

2) **React Context API** : Context provides a way to pass data through the component tree without having to pass props down manually at every level. This solves the problem of prop drilling that greatly affects the app performance.

	> In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

	In case of this react app, table and setTable were two states that were used by children components with the help of Context API
3) **Avoiding costly CSS styles to imrpove First Contentful Paint**  
4) **Storing states locally as much as possible** : Instead of using a state management library such as Redux, most states were stored and used locally to reduce overheads.
5) **Use of React Fragments <> </>**  : In order to avoid the DOM from creating several useless Nodes,  <React.Fragment> has been used in many instances.
6) **Using React Production Build** : The production build creates minified bundles, lighter-weight source maps, and optimized assets. This improves the load time. React recommends using production mode while deploying the react app.
