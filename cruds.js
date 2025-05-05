let title = document.getElementById('Title');
let price = document.getElementById('Price');
let taxes = document.getElementById('Taxes');
let ads = document.getElementById('Ads');
let discount = document.getElementById('Discount');
let total = document.getElementById('Total');
let count = document.getElementById('Caount');
let category = document.getElementById('Category');
let search = document.getElementById('search');
let submit = document.getElementById('Submit');
let tbody = document.getElementById('tbody');
let DeleteAll = document.getElementById('DeleteAll');
let btnClose = document.getElementById('CLOSE');

submit.onclick=function(){submit.textContent === "Create" ? creatCount() : SaveData(); };
btnClose.onclick=function(){cleardata();ReadData();btnClose.style.display="none";count.style.display="block";};
//Get Total
function getTotal() {
    let Result = ( +price.value + +taxes.value + +ads.value)- +discount.value;
    if (Result != 0) {
        total.innerHTML = Result;   
        total.style.background=' rgb(17, 146, 0)';
    }else{
        total.innerHTML = ' ' + Result;
        total.style.background=' rgb(128, 7, 7)';
    }
}

//Creat Product
let DataPro;
if (localStorage.product != null) {
    DataPro=JSON.parse(localStorage.product);
} else {
    DataPro=[];
}


function CreatData(){
    let NewPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    };

    //Save LocalStorage
    DataPro.push(NewPro);
    localStorage.setItem('product',JSON.stringify(DataPro));  
}
//Clear input
function cleardata() {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML=' 0';
    count.value='';
    count.readOnly = false;
    category.value='';
    total.style.background=' rgb(128, 7, 7)';
    submit.textContent = 'Create';
}
//Read
function ReadData() {
    let DataTable ='';
    for (let i = 0; i < DataPro.length; i++) {
        DataTable +=
        `
        <tr class="${i%2===0?'Whitecolor':'BlueColor'}">
        <td>${i+1}</td>
        <td>${DataPro[i].title}</td>
        <td>${DataPro[i].price}</td>
        <td>${DataPro[i].taxes}</td>
        <td>${DataPro[i].ads}</td>
        <td>${DataPro[i].discount}</td>
        <td>${DataPro[i].total}</td>
        <td>${DataPro[i].category}</td>
        <td><button id="update" onclick="UpdateData(${i})">Update</button></td>
        <td><button id="Delete" onclick="DeletData(${i})">Delete</button></td>
        </tr>
        `;
    }
    tbody.innerHTML = DataTable;
    
    if ( DataPro.length > 0 ) {
        DeleteAll.innerHTML = `<button onclick ="DeleteALLDATA() " > DELETE ALL ( ${DataPro.length} )</button>`;       
    }
    else{
        DeleteAll.innerHTML = ``;       
    }
}
//Count
function creatCount() {
    if (title.value !="") {
        if (count.value ==="") {
            CreatData();
            cleardata();
            ReadData();
            title.focus();
        } else if(count.value >= 1) {
           for (let i = 0; i < count.value ; i++) {
            CreatData();
            } 
            cleardata();
            ReadData();
            title.focus();
        }else if (count.value == 0) {
            alert('لا يمكن تسجيل عدد 0 من هذا الحقل يجب تعديل رقم العداد')
        }
    } else {
        alert('يجب تعبئة الحقول');
    }    
       
}
//Delet
function DeletData(i) {
    if (submit.textContent==="Create") {
        DataPro.splice(i,1);
        localStorage.product=JSON.stringify(DataPro);
        ReadData();
    } else {
        alert(' لا يمكن حذف المنتجات قبل حفظ التعديلات');
    }
}

//Delet ALL
function DeleteALLDATA() {
    if (submit.textContent==="Create") {
        DataPro.splice(0);
        localStorage.clear();
        ReadData();
    } else {
        alert(' لا يمكن حذف المنتجات قبل حفظ التعديلات');
    }
}


//Update
let numUpdate=0;
function UpdateData(i) {
    title.value=DataPro[i].title;
    price.value=DataPro[i].price;
    taxes.value=DataPro[i].taxes;
    ads.value=DataPro[i].ads;
    discount.value=DataPro[i].discount;
    category.value=DataPro[i].category;
    count.style.display="none";
    btnClose.style.display="block";
    submit.textContent="Save";
    numUpdate=i;
    getTotal();
    scroll({top:0,behavior:"smooth"});
}

//Save Data
function SaveData(){
    if (title.value!='') {
        DataPro[numUpdate].title=title.value;
        DataPro[numUpdate].price= price.value;
        DataPro[numUpdate].taxes=taxes.value;
        DataPro[numUpdate].ads=ads.value;
        DataPro[numUpdate].discount=discount.value;
        DataPro[numUpdate].category=category.value;
        DataPro[numUpdate].total=total.innerHTML;
        localStorage.product=JSON.stringify(DataPro);
        submit.textContent="Create";
        count.style.display="block";
        btnClose.style.display="none";
        ReadData();
        cleardata();
    }else{
        alert('يجب تعبئة الحقول');
    }
    
}

// ENTER JUST NUMBER DATA VALIDATION 
function validate(e) {
    var key = e.keyCode || e.which;
    key = String.fromCharCode(key);
  
    var regex = /[0-9\.\-]/;


    if( !regex.test(key) ) {
       e.returnValue = false;
       if(e.preventDefault) e.preventDefault();
    }
}

//Search
let searchsort = '';
function GetSearchMoode(btn_id) {
    search.focus();
    if (btn_id =='SearchTitel') {
        searchsort = 'Title';
        search.placeholder='Search BY Titel';
    } else if (btn_id =='SearchCategory') {
        searchsort = 'Category';
        search.placeholder='Search BY Category';
    }
}

search.onkeyup=function(){let sdtb = search.value.toLowerCase(); SearchData(sdtb)};

function SearchData(value_data) {
    let DataTable = '';
    if (searchsort =='Title') {
        for (let i = 0; i < DataPro.length; i++) {
            let searchdatalower = DataPro[i].title.toLowerCase();
            if(searchdatalower.includes(value_data)){
                DataTable +=
                `
                <tr class="${i%2===0?'Whitecolor':'BlueColor'}">
                <td>${i+1}</td>
                <td>${DataPro[i].title}</td>
                <td>${DataPro[i].price}</td>
                <td>${DataPro[i].taxes}</td>
                <td>${DataPro[i].ads}</td>
                <td>${DataPro[i].discount}</td>
                <td>${DataPro[i].total}</td>
                <td>${DataPro[i].category}</td>
                <td><button id="update" onclick="UpdateData(${i})">Update</button></td>
                <td><button id="Delete" onclick="DeletData(${i})">Delete</button></td>
                </tr>
                `;
            }
            tbody.innerHTML = DataTable;
        }
    } else if (searchsort =='Category') {
        for (let i = 0; i < DataPro.length; i++) {
            let searchdatalower = DataPro[i].category.toLowerCase();
            if(searchdatalower.includes(value_data)){
                DataTable +=
                `
                <tr class="${i%2===0?'Whitecolor':'BlueColor'}">
                <td>${i+1}</td>
                <td>${DataPro[i].title}</td>
                <td>${DataPro[i].price}</td>
                <td>${DataPro[i].taxes}</td>
                <td>${DataPro[i].ads}</td>
                <td>${DataPro[i].discount}</td>
                <td>${DataPro[i].total}</td>
                <td>${DataPro[i].category}</td>
                <td><button id="update" onclick="UpdateData(${i})">Update</button></td>
                <td><button id="Delete" onclick="DeletData(${i})">Delete</button></td>
                </tr>
                `;
            }
            
        } 
        tbody.innerHTML = DataTable;
    }
   
}

//Clean Data


cleardata();
ReadData();