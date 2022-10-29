$(".fa-align-justify").click(function(e){
    $("#item1").css({
        position:'absolute',
        marginTop: '50px',
        transition:'all 5s'
    });
    
})
$("#close").click(function(e){
    $(".sideNavMenu").toggleClass("activesidebar","inactivesidebar")
    $("#close").toggleClass("fa-xmark","fa-align-justify")
    
    /*
    
    let offsetEle = $(".NavMenu").offset().left;
    let sideNavMenu = $(".sideNavMenu").innerWidth();

    if(offsetEle == 0){
        // $(".NavMenu").animate({left:`-${sideNavMenu}px`},1000)
        $(".sideNavMenu").css("display","block")
        
    }
    else{
        console.log(offsetEle)
        
        $(".sideNavMenu").css("left","250px")

        // $(".NavMenu").animate({left:`0`},1000)
        // 

    }
    */
})



// lodding
function loading(){
    $(document).ready(function(){
        $(".sk-cube-grid").fadeOut(1000,function(){
            $("#loading").remove()
            $("body").css("overflow-y","auto")
        })
        AOS.init();
    })
}

// $(document).ready(function(){
//     $(".sk-cube-grid").fadeOut(1000,function(){
//         $("#loading").remove()
//         $("body").css("overflow-y","auto")
//     })
//     AOS.init();
// })


/*
function remove(){
    $('#activediv').remove();

}
*/

// function test(){
//     alert('hi');
// }

// $("#test").click(function() {
//     // $(this).css("opacity"," 1" );
//     alert("hi");
// })

/*
|
|--------------------------------------
| L a n d i n g  P a g e
|--------------------------------------
|
*/

async function landingpage()
{
    var cartona = ``;
    cartona += `
    <div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    responseData = await apiResponse.json()
    // console.log(responseData);
    for (let i=0; i< responseData.meals.length ; i++) {
        cartona +=`
        <div class="col-md-3 my-2 position-relative shadow" onclick="filterbyMealID('${responseData.meals[i].idMeal}')">
            <div class="  ">
                <div class="layer categoreyMeal rounded-2 position-absolute">
                    <div class=" d-flex align-items-center my-auto">
                        <h2>
                            ${responseData.meals[i].strMeal}
                        </h2>
                    </div>
                </div>
                <div>
                    <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                </div>
                
            </div>
        </div>
        `
    }
    cartona +=
     `</div>
    </div>
    </div>
    `
    
    document.getElementById("main").innerHTML = cartona ;
    
}
landingpage();


/*
|
|--------------------------------------
| s e c t i o n    c a t e g o r i e s
|--------------------------------------
|
*/



async function categories () {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    responseData = await apiResponse.json()

    var cartona = ``;
    // console.log(responseData.categories[0]);
    cartona += `
    <div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.categories.length ; i++) {
        cartona +=`
        <div class="col-md-3 my-2 position-relative shadow" onclick="filterbyCategory('${responseData.categories[i].strCategory}')">
            <div class="">
                <div class="layer categoreyMeal rounded-2 position-absolute">
                    <div class="text-center">
                        <h2>
                            ${responseData.categories[i].strCategory}
                        </h2>
                        <p>
                            ${responseData.categories[i].strCategoryDescription.substring(0,100)}
                        </p>
                    </div>
                </div>
                <div class="categoreyMealImg">
                    <img src="${responseData.categories[i].strCategoryThumb}" class="w-100 rounded-2" id="test" alt="">
                </div>
                
            </div>
        </div>
        `
    }
    cartona +=
     `</div>
    </div>
    </div>
    `
    document.getElementById("main").innerHTML = cartona ;
}



async function filterbyMealID(idMeal)
{
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    responseData = await apiResponse.json()
    var cartona = ``;
    console.log(responseData);
    cartona +=`<div class="mealDescription">
    <div class="container">`

    cartona +=`
    <div class="row  py-5 ">
        <div class="col-md-4 ">
            <img src="${responseData.meals[0].strMealThumb}" class="w-100" alt="">
            <br>
            <h1 class="text-center">
                ${responseData.meals[0].strMeal}
            </h1>
        </div>
        <div class="col-md-8">
            <h2>
                Instructions
            </h2>
            <p>
                ${responseData.meals[0].strInstructions}
            </p>
            <p>
                <b class="fw-bolder">
                    Area :
                </b>
                ${responseData.meals[0].strArea}
            </p>
            <p>
                <b class="fw-bolder">
                    Category :
                </b>
                ${responseData.meals[0].strCategory}

            </p>
            <h3>
                Recipes :
            </h3>
             
            <div class="container">
                <div class=" row">
                `
                let tagsarr=[];

                for (let i=0; i< 20 ; i++) {
                    if(responseData.meals[0][`strIngredient${i}`] != null && responseData.meals[0][`strIngredient${i}`] != '')
                    {
                        tagsarr.push(responseData.meals[0][`strIngredient${i}`])
                    }
                }

                for (let i=0 ; i< tagsarr.length ; i++) {
                    cartona +=
                    `<div class="col-md-2 bgTag my-2 p-1 mx-1 text-center">
                        <p class=" rounded-1">${tagsarr[i]}</p>
                    </div>`
                }
                cartona +=`
                </div>
            </div>

            <h3>
                Tags :
            </h3>
            

            <div class="container">
                <div class=" row">
                `
                if(responseData.meals[0][`strTags}`] != null && responseData.meals[0][`strIngredient`] != '')
                {
                    let tags=responseData.meals[0][`strTags`].split(",");
                    for (let i=0 ; i< tags.length ; i++) {
                        cartona +=
                        `<div class="col-md-2 bgTag my-2 p-1 mx-1 text-center">
                            <p class=" rounded-1">${tags[i]}</p>
                        </div>`;
                    }
                }
                else{
                    cartona +=
                        `<div class="col-md-2 bgTag my-2 p-1 mx-1 text-center">
                            <p class=" rounded-1">NO Tags</p>
                        </div>`;
                }
                cartona +=`
                </div>
            </div>

            <div>
                <button class="btn btn-success" onclick="window.location.assign('${responseData.meals[0].strSource}')">
                        Source
                </button>

                <button class="btn btn-danger" onclick="window.location.assign('${responseData.meals[0].strYoutube}')">
                    Youtube
                </button>
            </div>
            
        </div>
    </div>`
    // split(",")
    cartona +=
    `</div>
    </div>`;
document.getElementById("main").innerHTML =cartona ;
}





async function filterbyCategory (category) {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    responseData = await apiResponse.json()
    // console.log(idMeal[0].strMealThumb);

    var cartona = ``;
    cartona += `<div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.meals.length ; i++) {
        cartona +=`
            <div class="col-md-3 my-2 position-relative shadow" onclick="filterbyMealID(${responseData.meals[i].idMeal})">
                <div class="">
                    <div class="layer categoreyMeal rounded-2 position-absolute">
                        <div class="text-center">
                            <h2>
                                ${responseData.meals[i].strMeal}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                    </div>
                    
                </div>
            </div>
            `
        }
        cartona +=
        `</div>
        </div>
        </div>
        `
    document.getElementById("main").innerHTML = cartona;
}



/*
|
|--------------------------------------
| Search Seaction
|--------------------------------------
|
*/


async function displayatsearchpagybyMealID(idMeal)
{
    searchPage();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    responseData = await apiResponse.json()
    var cartona = ``;
    console.log(responseData);
    cartona +=`<div class="mealDescription">
    <div class="container">`

    cartona +=`
    <div class="row  py-5 ">
        <div class="col-md-4 ">
            <img src="${responseData.meals[0].strMealThumb}" class="w-100" alt="">
            <br>
            <h1 class="text-center">
                ${responseData.meals[0].strMeal}
            </h1>
        </div>
        <div class="col-md-8">
            <h2>
                Instructions
            </h2>
            <p>
                ${responseData.meals[0].strInstructions}
            </p>
            <p>
                <b class="fw-bolder">
                    Area :
                </b>
                ${responseData.meals[0].strArea}
            </p>
            <p>
                <b class="fw-bolder">
                    Category :
                </b>
                ${responseData.meals[0].strCategory}

            </p>
            <h3>
                Recipes :
            </h3>
             
            <div class="container">
                <div class=" row">
                `
                let tagsarr=[];

                for (let i=0; i< 20 ; i++) {
                    if(responseData.meals[0][`strIngredient${i}`] != null && responseData.meals[0][`strIngredient${i}`] != '')
                    {
                        tagsarr.push(responseData.meals[0][`strIngredient${i}`])
                    }
                }

                for (let i=0 ; i< tagsarr.length ; i++) {
                    cartona +=
                    `<div class="col-md-2 bgTag my-2 p-1 mx-1 text-center">
                        <p class=" rounded-1">${tagsarr[i]}</p>
                    </div>`
                }
                cartona +=`
                </div>
            </div>

            <h3>
                Tags :
            </h3>
            

            <div class="container">
                <div class=" row">
                `
                if(responseData.meals[0][`strTags}`] != null && responseData.meals[0][`strIngredient`] != '')
                {
                    let tags=responseData.meals[0][`strTags`].split(",");
                    for (let i=0 ; i< tags.length ; i++) {
                        cartona +=
                        `<div class="col-md-2 bgTag my-2 p-1 mx-1 text-center">
                            <p class=" rounded-1">${tags[i]}</p>
                        </div>`;
                    }
                }
                else{
                    cartona +=
                        `<div class="col-md-2 my-2 p-1 mx-1 text-center">
                            <p class=" rounded-1">NO Tags</p>
                        </div>`;
                }
                cartona +=`
                </div>
            </div>

            <div>
                <button class="btn btn-success" onclick="window.location.assign('${responseData.meals[0].strSource}')">
                        Source
                </button>

                <button class="btn btn-danger" onclick="window.location.assign('${responseData.meals[0].strYoutube}')">
                    Youtube
                </button>
            </div>
            
        </div>
    </div>`
    // split(",")
    cartona +=
    `</div>
    </div>`;
document.getElementById("activesearchdata").innerHTML =cartona ;
}

function searchPage(){
    $('#activediv').remove();
    $('#activesearchdata').remove();
    var cartona = ``;
    cartona += `
        <div class="search-container py-4 ">
            <div class="container w-75">
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2 " id="searchByName" placeholder="Search By Name" onkeyup="searchbyName()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2 " id="searchByFirstLetter" placeholder="Search By First Letter" maxlength="1" onkeyup="searchbyFirstLetter()">
                    </div>
                </div>
            </div>
            <div id="activesearchdata">

            </div>
        </div>
        
    `
    document.getElementById("main").innerHTML = cartona;
}

async function searchbyName () {
    if($('#searchByName').val()!="")
    {
    let mealname=$('#searchByName').val();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`)
    responseData = await apiResponse.json()
    // console.log(idMeal[0].strMealThumb);

    var cartona = ``;
    cartona += `<div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.meals.length ; i++) {
        cartona +=`
            <div class="col-md-3 my-2 position-relative shadow" onclick="displayatsearchpagybyMealID(${responseData.meals[i].idMeal})">
                <div class="">
                    <div class="layer categoreyMeal rounded-2 position-absolute">
                        <div class="text-center">
                            <h2>
                                ${responseData.meals[i].strMeal}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                    </div>
                    
                </div>
            </div>
            `
        }
        cartona +=
        `</div>
        </div>
        </div>
        `
    document.getElementById("activesearchdata").innerHTML = cartona;
   
    }
    else
    {
        searchPage();
    }
    
}

async function searchbyFirstLetter () {
    if($('#searchByFirstLetter').val()!="")
    {
    let FirstMealLetter=$('#searchByFirstLetter').val();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstMealLetter.charAt(0)}`)
    responseData = await apiResponse.json()
    // console.log(idMeal[0].strMealThumb);

    var cartona = ``;
    cartona += `<div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.meals.length ; i++) {
        cartona +=`
            <div class="col-md-3 my-2 position-relative shadow" onclick="displayatsearchpagybyMealID(${responseData.meals[i].idMeal})">
                <div class="">
                    <div class="layer categoreyMeal rounded-2 position-absolute">
                        <div class="text-center">
                            <h2>
                                ${responseData.meals[i].strMeal}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                    </div>
                    
                </div>
            </div>
            `
        }
        cartona +=
        `</div>
        </div>
        </div>
        `
    document.getElementById("activesearchdata").innerHTML = cartona;
   
    }
    else
    {
        searchPage();
    }
}



/*
|
|--------------------------------------
| s e c t i o n    a r e a s
|--------------------------------------
|
*/

async function areas () {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    responseData = await apiResponse.json()
    var cartona = ``;
    cartona +=`<div class="areas  position-relative" id="activediv">
        <div class="container">
        <div class="row ">`;
        console.log(responseData.meals);
    for (let i=0 ; i< 20; i++) {
        cartona +=`
            <div class="col-md-3 shadow mt-5 py-2 my-1 text-center"  onclick="filterbyarea('${responseData.meals[i].strArea}')">
                <i class="fa-solid  fa-city fa-3x " ></i>                
                <h2 class="text-white"> ${responseData.meals[i].strArea}</h2>                
            </div>
        `
    }
    cartona +=
    `</div>
    </div>`;
    document.getElementById("main").innerHTML = cartona ;
}



async function filterbyarea (area) {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    responseData = await apiResponse.json()
    // console.log(responseData.meals);
    var cartona = ``;
    cartona += `<div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.meals.length ; i++) {
        cartona +=`
            <div class="col-md-3 my-2 position-relative shadow" onclick="filterbyMealID(${responseData.meals[i].idMeal})">
                <div class="">
                    <div class="layer categoreyMeal rounded-2 position-absolute">
                        <div class="text-center">
                            <h2>
                                ${responseData.meals[i].strMeal}
                            </h2>
                        </div>
                    </div>
                    <div class="">
                        <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                    </div>
                    
                </div>
            </div>
            `
        }
        cartona +=
        `</div>
        </div>
        </div>
        `
    document.getElementById("main").innerHTML = cartona;
    
}





/*
|
|------------------------------------------
| s e c t i o n     i n g r e d i e n t s
|------------------------------------------
|
*/

async function ingredients() {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    responseData = await apiResponse.json()
    // console.log(responseData.meals);
    var cartona = ``;
    cartona +=`
        <div class="ingredients" id="activediv">
        <div class="container">
        <div class="row justify-content-between align-items-center">`;
    // for (let i=0 ; i< responseData.meals.length ; i++) {
    
    for (let i=0 ; i< 20 ; i++) {
        cartona +=`
            <div class="col-lg-3 shadow col-md-6  mt-4 py-1 my-1 text-center " id="activediv" onclick="filterbyingredient('${responseData.meals[i].strIngredient}')">
                <i class="fa-solid fa-3x fa-bowl-food"></i>                
                <h2>${responseData.meals[i].strIngredient.substring(0,15)}</h2>
                <p>${responseData.meals[i].strDescription.substring(0,85)} </p>                
            </div>
        `
    }
    cartona +=
    `</div>
    </div>
    </div>`;
    document.getElementById("main").innerHTML = cartona ;
}



async function filterbyingredient (ingredient) {
    $('#activediv').remove();
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    responseData = await apiResponse.json()
    // console.log(idMeal[0].strMealThumb);

    var cartona = ``;
    cartona += `<div class="categories" id="activediv">
    <div class="container">
    <div class="row py-5">`

    for (let i=0 ; i< responseData.meals.length ; i++) {
        cartona +=`
            <div class="col-md-3 my-2 position-relative shadow" onclick="filterbyMealID(${responseData.meals[i].idMeal})">
                <div class="">
                    <div class="layer categoreyMeal rounded-2 position-absolute">
                        <div class="text-center">
                            <h2>
                                ${responseData.meals[i].strMeal}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <img src="${responseData.meals[i].strMealThumb}" class="w-100 rounded-2" id="test" alt="">
                    </div>
                    
                </div>
            </div>
            `
        }
        cartona +=
        `</div>
        </div>
        </div>
        `
        document.getElementById("main").innerHTML = cartona;
}


/*
|
|--------------------------------------
| S e c t i o n      C o n t a c t
|--------------------------------------
|
*/


function contact(){
    $('#activediv').remove();
    let cartona = ``;
    cartona +=`<div class="contacUs py-5" id>
        <div class="container w-50  mx-auto text-center">
            <h2 class="py-4">ContacUs...</h2>
            <div class="row justify-content-center align-content-center">
                <div class="col-md-6 py-3" id="userNamediv">
                    <input type="text" class="form-control mb-2" id="userName" placeholder="Enter Your Name" onkeyup="userNameValid()">
                    
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserName">
                        Special Characters and Numbers not allowed
                    </p>
                </div>
                
                <div class="col-md-6 py-3">
                    <input type="text" class="form-control mb-2 " id="userEmail" placeholder="Enter Email" onkeyup="userEmailValid()">
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserEmail">
                        Enter valid email. *Ex: xxx@yyy.zzz                    
                    </p>
                </div>
                
                <div class="col-md-6 py-3">
                    <input type="text" class="form-control mb-2 " id="userPhone" placeholder="Enter phone" onkeyup="userPhoneValid()">
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserPhone">
                        Enter valid Phone Number
                    </p>
                </div>
                
                <div class="col-md-6 py-3">
                    <input type="text" class="form-control mb-2 " id="userAge" placeholder="Enter Age" onkeyup="userAgeValid()">
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserAge">
                        Enter valid Age                    
                    </p>
                </div>
                
                <div class="col-md-6 py-3">
                    <input type="text" class="form-control mb-2 " id="userPassword" placeholder="Enter Password" onkeyup="userPasswordValid()">
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserPassword">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </p>
                </div>
                
                <div class="col-md-6 py-3">
                    <input type="text" class="form-control mb-2 " id="userRepassword" placeholder="Enter RePassword" onkeyup="userRePasswordValid()">
                    <p class="alert mt-1  alert-danger d-none"  id="alertUserRepassword">
                        Enter valid Repassword
                    </p>
                </div>
                
            </div>
            <button class="btn btn-outline-danger">
                Submit
            </button>
        </div>
    </div>`;
    document.getElementById("main").innerHTML = cartona;
        
}

function userNameValid() {

    let userName=document.getElementById("userName").value
    let valid=/^[a-zA-Z ]+$/.test(userName)

    if (userName!=''){

        if(valid===false){

            $('#alertUserName').addClass("d-block").removeClass("d-none");
            $('#userName').addClass("is-invalid").removeClass("is-valid");
        }

        else
        {

            $('#alertUserName').addClass("d-none").removeClass("d-block");
            $('#userName').addClass("is-valid").removeClass("is-invalid");

        }
    }
}



function userEmailValid() {

    let userEmail = document.getElementById("userEmail").value
    let valid=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)

    if (userEmail!=''){

        if(valid===false){
            $('#alertUserEmail').addClass("d-block").removeClass("d-none");
            $('#userEmail').addClass("is-invalid").removeClass("is-valid");
        }
        else
        {
            $('#alertUserEmail').addClass("d-none").removeClass("d-block");
            $('#userEmail').addClass("is-valid").removeClass("is-invalid")
        }

    }
}

function userPhoneValid() {

    let userPhone = document.getElementById("userPhone").value
    let valid=/^(02201|01)[0125][0-9]{8}$/.test(userPhone)

    if (userPhone!=''){

        if(valid===false){
            $('#alertUserPhone').addClass("d-block").removeClass("d-none");
            $('#userPhone').addClass("is-invalid").removeClass("is-valid");
        }
        else
        {
            $('#alertUserPhone').addClass("d-none").removeClass("d-block");
            $('#userPhone').addClass("is-valid").removeClass("is-invalid")
        }
    }

}

function userAgeValid() {

    let userAge = document.getElementById("userAge").value

    let valid=/^[1-9][0-9]?$|^100$/.test(userAge)

    if (userAge!=''){

        if(valid===false){
            $('#alertUserAge').addClass("d-block").removeClass("d-none");
            $('#userAge').addClass("is-invalid").removeClass("is-valid");
        }
        else
        {
            $('#alertUserAge').addClass("d-none").removeClass("d-block");
            $('#userAge').addClass("is-valid").removeClass("is-invalid")
        }

    }

}

function userPasswordValid() {
    let userPassword = document.getElementById("userPassword").value
    let valid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword)

    if (userPassword!=''){
        if(valid===false){
            $('#alertUserPassword').addClass("d-block").removeClass("d-none");
            $('#userPassword').addClass("is-invalid").removeClass("is-valid");
        }
        else
        {
            $('#alertUserPassword').addClass("d-none").removeClass("d-block");
            $('#userPassword').addClass("is-valid").removeClass("is-invalid")
        }
    }
}



function userRePasswordValid() {
    let userPassword = document.getElementById("userPassword").value;
    let userRepassword = document.getElementById("userRepassword").value;
    let valid=userPassword===userRepassword

    if (userRepassword!=''){
        if(valid===false){
            $('#alertUserRepassword').addClass("d-block").removeClass("d-none");
            $('#userRepassword').addClass("is-invalid").removeClass("is-valid");
        }
        else
        {
            $('#alertUserRepassword').addClass("d-none").removeClass("d-block");
            $('#userRepassword').addClass("is-valid").removeClass("is-invalid")
        }
    }
}

