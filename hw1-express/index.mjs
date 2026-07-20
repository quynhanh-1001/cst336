import express from "express";
import Sentiment from "sentiment";

const app = express();
const sentiment = new Sentiment();

app.set("view engine", "ejs");
app.use(express.static("public"));

const aiParagraph = "Artificial Intelligence can help people solve problems, improve education, support doctors, and make technology more useful. However, people should also think carefully about risks, bias, privacy, and safety.";

// app.get("/", async (req, res) => {
//     // Home page, displays Web API data
// });

// app.get("/history", (req, res) => {
//     // History page
// });

// app.get("/applications", (req, res) => {
//     // Applications page
// });

// app.get("/robotics", (req, res) => {
//     // Robotics page
// });

// app.get("/tools", (req, res) => {
//     // New fifth page, displays Node package data
// });

app.get("/", async (req, res) => {
    let wikiData = {
        title: "Artificial Intelligence",
        extract: "Wikipedia API data could not be loaded.",
        content_urls: {
            desktop: {
                page: "https://en.wikipedia.org/wiki/Artificial_intelligence"
            }
        }
    };

    try {
        const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Artificial_intelligence");
        wikiData = await response.json();
    } catch (error) {
        console.log(error);
    }

    res.render("index", {
        activePage: "home",
        wikiData: wikiData
    });
});

app.get("/history", (req, res) => {
    res.render("history", {
        activePage: "history"
    });
});

app.get("/applications", (req, res) => {
    res.render("applications", {
        activePage: "applications"
    });
});

app.get("/robotics", (req, res) => {
    res.render("robotics", {
        activePage: "robotics"
    });
});

app.get("/tools", (req, res) => {
    const analysis = sentiment.analyze(aiParagraph);

    res.render("tools", {
        activePage: "tools",
        aiParagraph: aiParagraph,
        analysis: analysis
    });
});

// app.listen(3000, () => {
//     console.log("server started");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});