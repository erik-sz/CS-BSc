module.exports = function(app) {
    // in the navigation bar the Home link sends a get request, and this route renders index.html
    app.get("/", function (req,res) {
        res.render("index.html");
    });

    // in the navigation bar the Add-Food link sends a get request, and this route renders add-food.ejs
    app.get("/add-food", function (req,res) {
        res.render("add-food.ejs");
    });

    // in the navigation bar the Search-food link sends a get request, and this route renders search-food.ejs
    app.get("/search-food", function (req,res) {
        res.render("search-food.ejs");
    });

    // in the navigation bar the Update-food link sends a get request, and this route renders update-food.ejs
    app.get("/update-food", function (req,res) {
        res.render("update-food.ejs");
    });  

    // in the navigation bar the About link sends a get request, and this route renders about.html
    app.get("/about", function (req,res) {
        res.render("about.html");
    });   
    
    // on the Add-food page the form's sends a post request with input data on submit, and this route adds one record to the database 
    app.post("/add", function(req, res){
        // creating sql query command
        let sqlquery = "INSERT INTO ingridients (name, calorie, protein, fat, carbs, sugar, fiber) VALUES (?)";
        let newrecord = [req.body.name, 
                        req.body.calorie, 
                        req.body.protein, 
                        req.body.fat, 
                        req.body.carbs, 
                        req.body.sugar, 
                        req.body.fiber];
        // saving ingridient to database and render add-food.ejs with a message: Record is succesfully inserted
        db.query(sqlquery, [newrecord], (err, results) => {
            if(err){throw err;}
            res.render("add-food.ejs",  {inserted: true}); 
        });
    });
    
    // in the navigation bar the List-Food link sends a get request, and this route retrieves data from the database about all records in it, 
    // and sends th data as an object to render list-food.ejs, R6A
    app.get("/list-food", function(req,res){
        // query database to get all the ingridients
        let sqlquery = "SELECT * FROM ingridients";
        // execute sql query
        db.query(sqlquery, (err, result) => {if (err) {res.redirect("/");}           
            res.render("list-food.ejs", {ingridients: result});
        });
    });

    // this route receives a post request from the form elment on the search-food page, R4B
    app.post("/search", function(req,res){
        // query database to get all the ingridients which satisfies the search condition, R4C
        let sqlquery = "SELECT * FROM ingridients WHERE name LIKE '%" + req.body.keyword + "%'";
        // execute sql query, if there is no error, then renders search-food page with the results
        db.query(sqlquery, (err, result) => {if (err) {throw err;}
            res.render("search-food.ejs", {ingridients: result});
        });        
    });

    // this route receives a post request from the form elment on the update-food page and renders it again 
    app.post("/update-search", function(req,res){
        // query database to get all the ingridients
        let sqlquery = "SELECT * FROM ingridients WHERE name LIKE '%" + req.body.name + "%'";
        // execute sql query, if there is no error, then renders update-food page with the results
        db.query(sqlquery, (err, result) => {if (err) {throw err;}
            res.render("update-food.ejs", {ingridients: result});
        });
    });

    // this route receives a post request from a form elment on the update-food page with input data, to update a specific record in the database 
    app.post("/update", function(req,res){
        let sqlquery = "UPDATE ingridients SET name = '" + req.body.name 
                                        + "', calorie = " + req.body.calorie 
                                        + ", protein = " + req.body.protein 
                                        + ", fat = " + req.body.fat 
                                        + ", carbs = " + req.body.carbs 
                                        + ", sugar = " + req.body.sugar
                                        + ", fiber = " + req.body.fiber 
                                        + " WHERE id = " + req.body.id;
        console.log(sqlquery);
        // execute sql query, if there is no error, then renders update-food page with a feedback that the update was successful
        db.query(sqlquery, (err, result) => {if (err) {throw err;}
            res.render("update-food.ejs", {updated: true});        
        });
    });

    // this route receives post request from a form elment on the update-food page with input data, to delete a specific record in the database 
    app.post("/delete", function(req,res){
        let sqlquery = "DELETE FROM ingridients" + " WHERE id = " + req.body.id;
        // execute sql query, if there is no error, then renders update-food page with a feedback that the record was deleted successfully
        db.query(sqlquery, (err, result) => {if (err) {throw err;}
            res.render("update-food.ejs", {deleted: true});        
        });
    });
} 