# Creating an Express App: The Solar System

In this tutorial, we’ll create a “**Solar System**” website using Express. The website will include a few HTML web pages with images and text.  

In this tutorial, we will practice the following:   

* Installing Express and related packages  
* Creating routes  
* Serving static assets such as images, CSS files, etc.  
* Creating views  
* Installing and using a templating engine  
* Passing values from the controller to the views  
* Creating and applying partial files (“partials”)  
* Installing node packages  
* Fetching data from a Web API

1. #  Intro to Express

Express is the most popular Node.js **web application framework**. As such, it’s written entirely in JavaScript.   
The Express package itself provides just the very basic functionality of a web server, however, there are several additional packages that make it as robust as any other web server (it’s able to handle sessions, cookies, interact with databases, etc.)

There are several other **web application frameworks**, and each of them uses a specific programming language. For example, Spring Boot uses Java, Django and Flask use Python, Ruby on Rails uses Ruby, and Laravel uses PHP. These frameworks use the MVC (Model-View-Controller) architectural pattern to separate the data model with business rules from the user interface. To learn more visit: [https://developer.mozilla.org/en-US/docs/Learn/Server-side/First\_steps/Web\_frameworks](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks)

2. # Starting a Basic Express App     Optionally, [watch this video tutorial](https://csumb.space/cst/336/tutorials/videos/solar_system/) created by  a former TA for sections **2 to 10\.** 

1. Open the terminal window on your computer.   
   Create a new folder for your Express app and go inside it:  
   $ **mkdir myExpressApp**

	$ **cd myExpressApp**

2. *R*un the command:  
    **npm init**  
      
   This will create the **package.json** file. Use the default values provided by the interactive utility.

   Note: Optionally, you can run this command in “silent” mode, accepting all default values by typing:  
   **npm init \-y**

3. Install the Express-related packages, which are **express** and **ejs**  
   (**ejs** is the package for the template engine to create web pages)  
   From the terminal window,  
   run the command:  
   **npm i express ejs**  
   “**i**” is short for “install”. 

|  Templating Engines  The Express package is so minimalist that it doesn’t include its own functions to render HTML files or web pages. It needs a “Templating Engine”. EJS stands for “Embedded JavaScript Templates”. It allows HTML markup to be generated with plain JavaScript. You can learn more about EJS here: [https://ejs.co/](https://ejs.co/) There are many more templating engines such as Pug, Moustache, Handlebars, etc. Each of them has its own syntax. |
| :---- |

4. Create a new index.mjs file. Copy and paste the following lines of code into it. This is the basic code of any Express app.  Each line is explained below the image.

   **`import express from 'express';`**  
   **`const app = express();`**  
   `app.set("view engine", "ejs");`  
   `app.use(express.static("public"));`  
     
   `app.get('/', (req, res) => {`  
      `res.send('Hello Express app!')`  
   `});`  
     
   `app.listen(3000, () => {`  
      `console.log('server started');`  
   `});`  
     
     
   The first line imports the Express library.  
   The second line is based on the [Express package documentation](https://www.npmjs.com/package/express), it requires a variable to access the methods. By convention, the variable name is “**app**” but it can be any other name.   
     
   The lines in purple represent the “**root route**”.  This means that when opening the browser in the application's root folder, it should display the message “Hello Express app\!”. Each “route” maps to a corresponding URL.  We’ll create more routes later.  
     
   In the last three lines, we start the server using port 3000\. The second parameter is an anonymous function that displays a message in the terminal indicating that the server has started and that Express is listening for requests.  

5. Run the app by typing the following command on the terminal:  
   **`node index.mjs`**

6. Open your browser and go to **localhost:3000**  
   You should see the message  “Hello Express app\!” in the browser window.

3. # Setting up Templates (Views)

In our current code, the root route uses **res.send()** to display a message in the browser. “**res**” stands for “**response**”; in other words, it’s the information the server sends to the browser.  

The **send()** method allows for displaying short messages, and it’s even possible to include HTML tags.  However, it is not practical to display an entire web page using the **send()** method. Instead, we’ll use the **render()** method to render an HTML page.

There are a few steps to render a web page:

1) Create the folder structure  
2) Set the view engine  
3) Specify the folder for static files

1) Create the folder structure  
   Following the Express framework, all templates (generated HTML files) must be placed within a folder called “**views**”. So, create a folder called “**views**” at the same level as the index.mjs file  
     
   Also, all static files (such as images, CSS files, etc) should be placed within a folder called, by convention, “**public**”.  So, create a folder called “**public**” at the same level as the index.mjs file. Make sure that the **public** folder is NOT within the views **folder,** but at the same level.  
     
2) Set the view engine  
   Given that there are multiple templating engines, our Express app needs to know which one to use. That’s why we’ve added line 3 to the index.mjs file, to indicate that we’ll use **EJS** as our templating language:  
     
   `app.set("view engine", "ejs");`

   Keep in mind that you must install the corresponding template engine package first, which we did in the previous section by running:     
   npm i express **ejs** 

3) Specify the folder for static files (images, css, etc.)  
   We’re already doing this in line 4 of the index.mjs  file:    `app.use(express.static("public"));`

4. #  Rendering a Template 

1. In the index.mjs file, change the root route to use the **render**() method instead of **send**(). We’ll render a view called “*index*” (but it could have had any name). The **.ejs** extension is optional.  
   ![][image1]

2. Within the **views** folder, create a new file called “**index.ejs**”. The name of the file (index) must match the name passed in the render method.

3. Locate an image of the Solar System (use tools like [Pixabay.com](http://Pixabay.com) or generate one using AI tools). Create an “**img**” folder within the “**public**” folder and put the image inside it.

4. Copy and paste the following HTML code within the **index.ejs** file.  
    Do not include “**public**” as part of the path to the image.  
   \<\!DOCTYPE html\>  
   \<html\>  
   \<head\>  
     \<meta charset="utf-8"\>  
     \<title\>Solar System\</title\>  
   \</head\>  
   \<body\>  
       \<h1\>The Solar System\</h1\>  
        \<nav\>\<a href="**/**"\> Home \</a\>   
            \<a href="/earth"\> Earth \</a\>  
       \</nav\>  
       \<img src="**/img/solar-system.jpg**"\>  
   \</body\>  
   \</html\>  
     
5. Restart the app.  
   The app must be run every time the index.mjs file is updated (there is another package to avoid restarting the server, but for now, let’s just keep restarting the server).  You should see the **index.ejs** file content in the browser window.

   If you are running the app locally, to stop the server, open the terminal window where the server is running and press **Control+C.**    
   **Note**: For Mac users, it's still Ctrl+C. You might be used to using Cmd, but Ctrl+C is the universal shortcut for terminating console applications.

5. # Creating a New Route

   Let us create a second route to display information about Earth.

1. Open the index.mjs file and add the following new route below the root route.

   `app.get('/earth', (req, res) => {`  
    `res.render('earth')`  
   `});`  
     
2. Create a new file within the “**views**” folder. The name of the file must be the same as the value of the argument passed to the “render” function (earth) and have the .**ejs** extension.

   **Note**: The name of the view **does not** need to be the same as the name of the **route**. So, we could have used, for instance, “*planetEarth*” as the name of the view.

   

3. Copy and paste the following HTML code within the **earth.ejs** file

	\<\!DOCTYPE html\>  
\<html\>  
\<head\>  
  \<meta charset="utf-8"\>  
  \<title\>Solar System\</title\>  
\</head\>  
\<body\>  
    \<h1\>The Solar System\</h1\>  
     \<nav\>\<a href="**/**"\> Home \</a\>   
         \<a href="/earth"\> Earth \</a\>  
    \</nav\>  
    \<h2\>Planet Earth\</h2\>  
\</body\>  
\</html\>

4. Run the application. You should be able to access the Earth page by clicking on the corresponding link and then going back to the “Home” page. 

   Notice that the link to the Earth page was created by using the following tag and that the value of “href” corresponds to the name of the route.

   \<a href="**/earth**"\> Earth \</a\>  
     
   Likewise, the link to the “Home” page was created using the “root route” as the value of “href”, like this:  
     
   \<a href="**/**"\> Home \</a\>  
     
   We could manually add information and an image about planet Earth; however, we’ll use a Node Package instead\!

6. # Installing a Node Package    There are **four basic steps** to use a Node Package in an Express app:     **1\. Locate the package.** Use search tools such as [npmjs.org](https://www.npmjs.com/). Examine the packages found until identifying the appropriate one. In our case, we can use “Solar System” as the keyword. Among the results, we can identify the [npm-solarsystem](https://www.npmjs.com/package/npm-solarsystem) package.

   

**2\. Install the package**. Run the following command in the Terminal window.  
**npm install npm-solarsystem**

Optionally, you can use the shortcut version: **npm i npm-solarsystem**  
**Note:** When installing a package, all the package code is saved into the “**node\_modules**” folder. You can access and even modify the code\!

**3\. Import the package**. There are **two ways** to import node packages, and they can’t be used together. 

The old way uses the keyword “**require**”,  
The new way uses the keyword “**import**”.

We already used “import” to import the Express package in line 1 of the index.mjs file, so we’ll continue using “import”. The package's documentation will tell you which method it uses. In the case of the  [npm-solarsystem](https://www.npmjs.com/package/npm-solarsystem) package, you’ll notice on its documentation that it uses “**require**”:

const **planets** \= **require**('npm-solarsystem');

So, we need to switch it to use “**import**” by using the following syntax:  
const **planets** \= (**await import**('npm-solarsystem'))**.default**;

Add the line of code above as the second line of the index.mjs file. It will look like:  
**`import express from 'express';`**  
**`const` planets** **`=`** (**await import**('npm-solarsystem'))**.default**;  
**`const app = express();`**

|  Remember: If a package uses “require” change it to “await import” using the syntax above. |
| :---- |

**4\. Refer to the Package Documentation to use it.**  The package documentation specifies the names of the methods you can use and their corresponding output. In the case of the [npm-solarsystem package,](https://www.npmjs.com/package/npm-solarsystem) we can use methods such as:  
.getEarth(), .getVenus(), etc.   
The output is an object with properties such as: *image, description, moons.*  
Modify the  /earth route to get the information for planet Earth:

`app.get('/earth', (req, res) => {`  
 `let planetEarth =` **planets**`.getEarth();`  
 `console.log(planetEarth);`  
 `res.render('earth');`  
`});`

Restart the server. When going to the /earth route, the terminal window should display the Earth information.

7. # Passing Values from Routes to Views

So far, we’re displaying the Earth information in the terminal window, however, it should be displayed on the web page instead. We’ll need to pass the information from the route to the view.

1. In the last line of the **/earth** route, pass an object with the variable that contains the information:

   `res.render('earth', {`"*propertyName*":**`planetEarth`**`});`

*propertyName* can be any made-up name, such as “earthInfo”, “earth”, “planetInfo”, etc.  Optionally, it can be omitted to indicate that the property will have the same name as the variable. Change the line above with the following simpler version:

`res.render('earth', {planetEarth});`

2. On the **earth.ejs** file, use the *propertyName* within ejs tags: **\<%=    %\>**  
   To display the planet description, use: **\<%=   `planetEarth.description`  %\>**  
   To display the planet image, use:  
   \<img src="**\<%=   `planetEarth.image`  %\>**"\>  
   

|  Practice\! Try displaying the information for Mars\!You’ll need to create a new /mars route and a new mars.ejs view. Don’t create routes for other planets yet, since we’ll make a few changes before moving on with the rest of the planets.  |
| :---- |

#  You’ll notice that the Mars image is not displayed. The URL to the Mars picture in the npm-solarsystem package is broken.  The good news is that when we install a node package, we have access to its code, so let’s open the corresponding npm-solarsystem file to fix the broken URL.

# All packages are installed in the “**node\_modules**” folder. So, let’s open this folder and locate the “**npm-solarsystem**” folder, and then open the **index.js** file. In line 56, locate the URL to the Mars image.  Search for a Mars picture you can use and locate its URL ([like this one from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/960px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png)). Replace the image value and save the file.![][image2]

8. #  Adding Styles

In the Express framework, all static files (images, external CSS files, external JavaScript files, etc.) must be included in a separate folder (they won’t be embedded if they’re located within the **“views”** folder). By convention, all static files are included in a folder called “**public**” (but you can use a different folder name). 

We have already configured the use of the “public” folder when we added the line:   `app.use(express.static("public"));`

1) Let’s add a couple of CSS rules in an external CSS file.   
   Within the “**public**” folder, create a “**css**” folder.

   Within the “**css**” folder, create a new empty file called “**styles.css**”

2) Type the following CSS rule in the **styles.css** file. You can add any other styles you want or use a different background color (colors can be selected using an [online color picker tool](https://www.w3schools.com/colors/colors_picker.asp))[![][image3]](https://www.w3schools.com/colors/colors_picker.asp)

3) Open the **index.ejs** file and embed the external CSS file within the \<head\> section using the code below:  
   ![][image4]

   Observe that the path to the file starts with a forward slash (the root folder) and that “public” is NOT part of the path: **/css/styles.css.**  

4) Save the **index.ejs** file and reload it in the browser.   
   You don’t need to restart the app if the index.mjs file is not modified.  
                         

9. # Using “Partials”

Partials are reusable, embeddable content that can be used across multiple web pages, such as the navigation or footer.

1) Create a folder called “**partials**” within the “**views**” folder.

2) Create a new empty file called “**head.ejs**” within the “**partials**” folder.

3) Cut the **\<head\>** element, lines 3 to 7, from the “**index.ejs**” file and paste them into the “**head.ejs**” file.  
     
4) In the “**index.ejs**” file, include the “**head.ejs**” file by pasting this line of code in line 3:  
   \<%- include('partials/head.ejs') %\>

5) Do the same for the **\<nav\>** element.

6) Add a **\<footer\>** partial as well  
   

| EJS Tags The EJS templating engine uses the tags \<%   and   %\> To render HTML tags, we must use a hyphen after the open EJS tag:  \<%\-   include('partials/head.ejs') %\> Try replacing the hyphen with an equal symbol: \<%\=  include('partials/head.ejs') %\>  You’ll notice that the HTML tags are displayed rather than applied. |
| :---- |

10. # Display a Random Background Image

    One of the main benefits of using server-side programming is the ability to hide sensitive information, such as Web API Keys. We’ll get a random image from a Web API and display it as the background of the **index.ejs** file.

1. Install the node-fetch package.

            In the terminal window, type:   `npm install node-fetch`

2. On the index.mjs file, import the node-fetch package right below importing express:  
   `import express from 'express';`  
   `import fetch from 'node-fetch'`;

3. On the index.mjs file, modify the “**/**” route by adding the code below.   
   Notice that the anonymous function is preceded by the **async** keyword because it uses **await**.

   `app.get('/', async(req, res) => {`

        `let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";`

   	``let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;``

       `let response = await fetch(url);`

       `let data = await response.json();`

       `let randomImage = data.urls.full;`

       `res.render("index",{"image":randomImage})`

   `});`

   The code above uses the “Unsplash” Web API, which provides only 50 hits per hour. If you get a “rate exceed” error, consider getting your own API Key by [registering as a developer](https://unsplash.com/join) and then creating an app.

   Notice that in the last line of the code above, we’re passing an object as a parameter to the “index” view. Optionally, we could have simply used:  
   `res.render("index",{randomImage})`

4. Modify the **index.ejs** file to add the following \<style\> block right below the “**head.ejs**” partial. Observe that we’re using the `image` object property that we passed in the last line of the root route.

   \<%- include('partials/head.ejs') %\>  
   **\<style\>**

       **body{** 

           **background-image: url("\<%=** `image` **%\>");**

           **background-size: cover;**

       **}**

 	**\</style\>**

5.  Restart the app. You should see a random background image when the page loads.

11. # Refactoring the **index.mjs** file

So far, we’ve created two routes and two views to display the information for two planets: Earth and Mars.  We could continue creating routes and views for the remaining planets…but we would not be using the full potential of the templating language.  Let’s refactor our code to retrieve the information for **all** planets with just **three** lines\! 

1. Start by creating the following  **/planet** route:

   `app.get('/planet', (req, res) => {`  
    `let planetName = req.query.planetName;`  
    `let planetInfo =` **planets**``[`get${planetName}`]();``  
    `res.render('planet', { planetInfo, planetName });`  
   `});`  
     
   The **`/planet`** route has to be accessed using a query string in the URL, something like:  localhost:3000**`/planet?planetName=Earth`**

   The first line of code stores the planet name passed in the query string into the **`planetName`** variable.  
     
   `let planetName = req.query.planetName;`

|  `When sending data through the URL (query string), you can access it in Express using req.query. For example, if the URL is /search?term=javascript, you can access the value with req.query.term` |
| :---- |

     
   The second line of code uses the bracket notation to invoke a function.   
   Previously, we had:  **planets**`.getEarth()`  
   Using the bracket notation:  **planets\[**`"getEarth"`**\]()**

   However, instead of “Earth” we need to use the name of the planet that we’re getting through the URL (which is in the **`planetName`** variable). That’s why the second line uses: **planets**``[`get${planetName}`]();``

   

   In the third line, we’re passing the **`planetInfo`** object and the **`planetName`** variable to the “`planet`” view:     
   `res.render('planet', { planetInfo, planetName });`

2. Create the `planet` view  
   You can duplicate the **earth.ejs** file and rename it to **planet.ejs**  
   Replace **planetEarth** with **planetInfo**  
   Use **`planetName`** to display the planet name in the header

3. Modify the **nav.ejs** file  
   Replace  \<a href="**/earth**"\> Earth \</a\>  
   With       \<a href="**/planet?planetName=Earth**"\> Earth \</a\>  
   Make sure to capitalize the planet names since the function names are capitalized.  Do the same for all planets.

4. Save and test it\!

12. # Complete the remaining requirements on your own. Refer to the rubric in Canvas. 

13. # Running an Express app with Nodemon (optional)

By default, the app must be restarted every time the index.mjs file is modified.   
There are some packages that prevent it, such as nodemon.

To run an Express app with nodemon:

1) Install nodemon globally by typing:  
   **npm install \-g nodemon**  
     
2) Run your app by typing:  
   **nodemon index.mjs**

 Now, whenever the index.mjs file is modified, the server will restart automatically.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>