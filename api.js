const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use("/codemirror-5.65.17", express.static("C:/Users/Dell/OneDrive/Documents/CODE EDITOR/codemirror/codemirror-5.65.17"));

app.get("/", function(req, res) {
    compiler.flush(function() {
        console.log("Temporary files deleted");
    });
    res.sendFile("C:/Users/Dell/OneDrive/Documents/CODE EDITOR/codeVS.html");
});

app.post("/compile", function(req, res) {
    const code = req.body.code;
    const input = req.body.input || ""; // Default to empty string if no input
    const lang = req.body.lang;

    try {
        if (lang === "CPP") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileCPP(envData, code, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            }
        } else if (lang === "JAVA") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compileJava(envData, code, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            }
        } else if (lang === "PYTHON") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    if (data.error) {
                        res.send({ output: "error", error: data.error });
                    } else {
                        res.send({ output: data.output });
                    }
                });
            }
        } else {
            res.send({ output: "error", error: "Unsupported language" });
        }
    } catch (e) {
        console.log("Error:", e);
        res.send({ output: "error", error: e.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
