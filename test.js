let employee            = ''
let employeeSalary      = 0
let monthlySalary       = document.getElementById('monthlySalary')
let shiftStart          = document.getElementById('shiftStart'   )    
let shiftEnd            = document.getElementById('shiftEnd'     )   
let dateOfDay           = document.getElementById('dateOfDay'    )   
let userLogin           = document.getElementById('userLogin'    )
let userLogout          = document.getElementById('userLogout'   )
let dailyLoans          = document.getElementById('dailyLoans'   )
let dailyCoins          = document.getElementById('dailyCoins'   )

let addDayBTN = document.getElementById("addDayBTN")
let salaryType = document.getElementById("salaryType")

let shiftLongTime       = 10

let allDaysArray      = []
let userAllDays

let dayCount = 0

let lateByH = 0
let lateByM = 0
let totalLate =0

let overTimeByH = 0
let overTimeByM = 0
let totalOverTime = 0

let totalLoans = 0

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function getAllDataFromLocalStorage(){

    if (localStorage.getItem('vigilia-allDays')) {

        allDaysArray = JSON.parse(localStorage.getItem('vigilia-allDays'))
    
    }else{
    
        allDaysArray =[]
    }
}
getAllDataFromLocalStorage()

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function selectEmployee(name){

    restoreBTN()

    employee = name

    const currentDate = new Date();

    document.getElementById('')
    if (name === 'Samah') {
        monthlySalary.value        = 8000
        shiftStart.value           = '13:00'
        shiftEnd.value             = '23:00'
    }else if (name === 'Aya') {
        monthlySalary.value        = 5000
        shiftStart.value           = '11:00'
        shiftEnd.value             = '21:00'
    }else if (name === 'Dalia') {
        monthlySalary.value        = 2500
        shiftStart.value           = '11:00'
        shiftEnd.value             = '21:00'
    }

    employeeSalary = monthlySalary.value

    dateOfDayByYear = currentDate.getFullYear()
    dateOfDayByMonth = currentDate.getMonth()+1
    dateOfDayByDay = currentDate.getDate()
    
    if (dateOfDayByMonth < 10 && dateOfDayByDay < 10) {
    
        dateOfDay.value  = `${dateOfDayByYear}-0${dateOfDayByMonth}-0${dateOfDayByDay}`;

    }else if (dateOfDayByMonth >= 10 && dateOfDayByDay >= 10) {
     
        dateOfDay.value  = `${dateOfDayByYear}-${dateOfDayByMonth}-${dateOfDayByDay}`;

    }else if (dateOfDayByMonth >= 10 && dateOfDayByDay < 10) {
        
        dateOfDay.value  = `${dateOfDayByYear}-${dateOfDayByMonth}-0${dateOfDayByDay}`;

    }else if (dateOfDayByMonth < 10 && dateOfDayByDay >= 10) {

        dateOfDay.value  = `${dateOfDayByYear}-0${dateOfDayByMonth}-${dateOfDayByDay}`;
        
    }



    userLogin.value  = shiftStart.value
    userLogout.value = shiftEnd.value
    dailyLoans.value = 0
    dailyCoins.value = 0

    displayInfo()

    calcFinalPrice()
    // localStorage.removeItem('vigilia-allDays')
}

selectEmployee('Samah')


// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function displayInfo(){

    userAllDays =[]

    allDaysArray.filter(function(ele){

        if (ele.employeeName === employee && ele.dateYear === Number(  document.getElementById('dateOfDay').value.split('-')[0]) && ele.dateMonth === Number(  document.getElementById('dateOfDay').value.split('-')[1])) {

            userAllDays.push(ele)
        
        }
        
    })

    let cartona = ''

    if (userAllDays.length === 0) return  document.getElementById('tableData1').innerHTML = cartona

    let userArraySortByDay = userAllDays.sort((a,b)=>(a.dateDay - b.dateDay))
    let userArraySortByMonth = userArraySortByDay.sort((a,b)=>(a.dateMonth - b.dateMonth))
    let userArraySortByYear = userArraySortByMonth.sort((a,b)=>(a.dateYear - b.dateYear))


    for (let i = 0; i < userArraySortByYear.length; i++) {

        if (userArraySortByYear[i].dayStatus == 'Normal') {

            cartona += 

            `
            <tr>
                <th>${userAllDays[i].employeeName   }</th>
                <th>${userAllDays[i].dateDay        }</th>
                <th>${userAllDays[i].userLogin      }</th>
                <th>${userAllDays[i].userLogout     }</th>
                <th>${userAllDays[i].userLate       }</th>
                <th>${userAllDays[i].userOvertime   }</th>
                <th>${userAllDays[i].dailyLoans     }</th>
                <th>${userAllDays[i].dailyCoins     }</th>
                <th>${userAllDays[i].dailyDiscount  }</th>
                <th>${userAllDays[i].dailyExtra     }</th>
            </tr>
            `
        }else if (userArraySortByYear[i].dayStatus == 'Holiday') {
            cartona += 

            `
            <tr>
                <th class="bg-success">${userAllDays[i].employeeName   }</th>
                <th>${userAllDays[i].dateDay        }</th>
                <th>${userAllDays[i].userLogin      }</th>
                <th>${userAllDays[i].userLogout     }</th>
                <th>${userAllDays[i].userLate       }</th>
                <th>${userAllDays[i].userOvertime   }</th>
                <th>${userAllDays[i].dailyLoans     }</th>
                <th>${userAllDays[i].dailyCoins     }</th>
                <th>${userAllDays[i].dailyDiscount  }</th>
                <th>${userAllDays[i].dailyExtra     }</th>
            </tr>
            `
        }else if (userArraySortByYear[i].dayStatus == 'Half Day Off') {
            cartona += 

            `
            <tr>
                <th class="bg-warning">${userAllDays[i].employeeName   }</th>
                <th>${userAllDays[i].dateDay        }</th>
                <th>${userAllDays[i].userLogin      }</th>
                <th>${userAllDays[i].userLogout     }</th>
                <th>${userAllDays[i].userLate       }</th>
                <th>${userAllDays[i].userOvertime   }</th>
                <th>${userAllDays[i].dailyLoans - Math.round(userAllDays[i].salaryByDay / 2) *-1           }</th>
                <th>${userAllDays[i].dailyCoins     }</th>
                <th class="bg-warning">${userAllDays[i].dailyDiscount  }</th>
                <th>${userAllDays[i].dailyExtra     }</th>
            </tr>
            `
        }else if (userArraySortByYear[i].dayStatus == 'Full Day Off') {
            cartona += 

            `
            <tr>
                <th class="bg-danger">${userAllDays[i].employeeName   }</th>
                <th>${userAllDays[i].dateDay        }</th>
                <th>${userAllDays[i].userLogin      }</th>
                <th>${userAllDays[i].userLogout     }</th>
                <th>${userAllDays[i].userLate       }</th>
                <th>${userAllDays[i].userOvertime   }</th>
                <th>${userAllDays[i].dailyLoans - Math.round(userAllDays[i].salaryByDay) *-1           }</th>
                <th>${userAllDays[i].dailyCoins     }</th>
                <th class="bg-danger">${userAllDays[i].dailyDiscount  }</th>
                <th>${userAllDays[i].dailyExtra     }</th>
            </tr>
            `
    
        }

        
            document.getElementById('tableData1').innerHTML = cartona

    
    }

    calcFinalPrice()
}

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function restoreBTN(){

    addDayBTN.classList.replace(`btn-danger`,'btn-primary')
    addDayBTN.classList.remove('disabled')
    addDayBTN.innerText = 'Add New Day'
}

function calcAndAddDay(){

    let userFounded = false

   allDaysArray.filter(function(ele){

        if (ele.employeeName === employee && ele.dateYear === Number(  document.getElementById('dateOfDay').value.split('-')[0]) && ele.dateMonth === Number(  document.getElementById('dateOfDay').value.split('-')[1]) && ele.dateDay === Number(  document.getElementById('dateOfDay').value.split('-')[2])) {

            userFounded = true
            addDayBTN.classList.replace('btn-primary','btn-danger')
            addDayBTN.classList.add('disabled')
            addDayBTN.innerText = 'The Day Already Exist..!'

        
        }
        
    })

    if(userFounded) return false

    addDayBTN.classList.replace('btn-primary','btn-success')
    addDayBTN.classList.add('disabled')
    addDayBTN.innerText = 'Added Success'

    setTimeout(() => {
        addDayBTN.classList.replace('btn-success','btn-primary')
        addDayBTN.classList.remove('disabled')
        addDayBTN.innerText = 'Add New Day'
    }, 2000);

    let employeeName     =          document.getElementById('employeeName'  ).value
    let monthlySalary    = Number(  document.getElementById('monthlySalary' ).value)
    let salaryByDay      = Number(  monthlySalary / 30 )
    let salaryByHour     = Number(  salaryByDay / shiftLongTime )
    let dateOfDay        =          document.getElementById('dateOfDay'     ).value
    let dateYear         = Number(  document.getElementById('dateOfDay'     ).value.split('-')[0]) 
    let dateMonth        = Number(  document.getElementById('dateOfDay'     ).value.split('-')[1]) 
    let dateDay          = Number(  document.getElementById('dateOfDay'     ).value.split('-')[2]) 

    let shiftStart       =          document.getElementById('shiftStart'    ).value
    let shiftStartByH    = Number(  document.getElementById('shiftStart'    ).value.split(':')[0])
    if (shiftStartByH == 0) {

        shiftStartByH = 24
        
    }
    let shiftStartByM    = Number(  document.getElementById('shiftStart'    ).value.split(':')[1])
    
    let shiftEnd         =          document.getElementById('shiftEnd'      ).value
    let shiftEndByH      = Number(  document.getElementById('shiftEnd'      ).value.split(':')[0])
    if (shiftEndByH == 0) {

        shiftEndByH = 24

    }
    let shiftEndByM      = Number(  document.getElementById('shiftEnd'      ).value.split(':')[1])

    let dayStatusNormal  =          document.getElementById('normal'        ).checked
    let dayStatusHoliday =          document.getElementById('holiday'       ).checked
    let halfDayOff       =          document.getElementById('halfDayOff'    ).checked
    let fullDayOff       =          document.getElementById('fullDayOff'    ).checked
    let dayStatus
    if (dayStatusNormal) {
        dayStatus = "Normal"
    }
    else if(dayStatusHoliday){
        dayStatus = "Holiday"
    }
    else if(halfDayOff){
        dayStatus = "Half Day Off"
    }
    else if(fullDayOff){
        dayStatus = "Full Day Off"
    }

    let userLogin        =          document.getElementById('userLogin'     ).value
    let userLoginByH     = Number(  document.getElementById('userLogin'     ).value.split(':')[0])
    if (userLoginByH == 0 ) {

        userLoginByH = 24

    }
    let userLoginByM     = Number(  document.getElementById('userLogin'     ).value.split(':')[1])
    
    let userLogout       =          document.getElementById('userLogout'    ).value
    let userLogoutByH    = Number(  document.getElementById('userLogout'    ).value.split(':')[0])
    if (userLogoutByH == 0 ) {

        userLogoutByH = 24
        
    }
    let userLogoutByM    = Number(  document.getElementById('userLogout'    ).value.split(':')[1])

    let dailyLoans       = -Number(  document.getElementById('dailyLoans'    ).value)
    let dailyCoins       = +Number(  document.getElementById('dailyCoins'    ).value)

    let userLate         = 0
    let userLateMony     = 0        
    let userOvertime     = 0    
    let userOverMony     = 0   

    if (userLoginByH > shiftStartByH) {

        userLate = userLate + ( ( ( ( userLoginByH - shiftStartByH ) * 60 ) + userLoginByM ) / 60 )

        userLateMony = userLateMony + ( salaryByHour * userLate )

    }else if (userLoginByH == shiftStartByH) {
        
        userLate = userLate + 0

        userLateMony = userLateMony + 0

    }else{

        userOvertime = userOvertime + ( ( ( ( shiftStartByH - userLoginByH ) * 60 ) + userLoginByM ) / 60 )

        userOverMony = userOverMony + ( salaryByHour * userOvertime )
    }
    
    // -------------------------------------------

    if (userLogoutByH > shiftEndByH) {

        userOvertime = userOvertime + ( ( ( ( userLogoutByH - shiftEndByH ) * 60 ) + userLogoutByM ) / 60 )

        userOverMony = userOverMony + ( salaryByHour * userOvertime )

    }else if (userLogoutByH == shiftEndByH) {
        
        userOvertime = userOvertime + 0

        userOverMony = userOverMony + 0

    }else if (userLogoutByH < (shiftEndByH - ( shiftLongTime / 2 )) ) {
        
        
        userOvertime = userOvertime + ( ( ( ( (userLogoutByH + 24) - shiftEndByH ) * 60 ) + userLogoutByM ) / 60 )

        userOverMony = userOverMony + ( salaryByHour * userOvertime )

    }else{

        userLate = userLate + ( ( ( ( shiftEndByH - userLogoutByH ) * 60 ) + userLogoutByM ) / 60 )

        userLateMony = userLateMony + ( salaryByHour * userLate )
    }

    let dailyDiscount = Math.round(-userLateMony + dailyLoans)     

    let dailyExtra    = Math.round(userOverMony + dailyCoins)    




   if (dayStatus == 'Holiday') {
       
            userLogin        = '00:00'         
            userLoginByH     = 0               
            userLoginByM     = 0               
            userLogout       = '00:00'         
            userLogoutByH    = 0               
            userLogoutByM    = 0               
            dailyLoans       = 0               
            userOvertime     = 0               
            userOverMony     = 0               
            userLate         = 0               
            userLateMony     = 0               
            dailyDiscount    = 0               
            dailyExtra       = 0               
            dailyCoins       = 0
    
    
    }else if (dayStatus == 'Half Day Off') {
                                             
        userLogin        = userLogin                                    
        userLoginByH     = userLoginByH                                 
        userLoginByM     = userLoginByM                                 
        userLogout       = userLogout                                   
        userLogoutByH    = userLogoutByH                               
        userLogoutByM    = userLogoutByH                                
                                      
        userLate         = 0              
        dailyLoans = dailyLoans + -Math.round(salaryByDay / 2)     
        dailyDiscount    = dailyLoans

    
        
    }else if (dayStatus == 'Full Day Off') {
        
        userLogin        = '00:00'         
        userLoginByH     = 0               
        userLoginByM     = 0               
        userLogout       = '00:00'         
        userLogoutByH    = 0               
        userLogoutByM    = 0                                       
                                      
        userLate         = 0              
        dailyLoans = dailyLoans + -Math.round(salaryByDay)     
        dailyDiscount    = dailyLoans

        userOvertime = 0
        userOverMony = 0

    }

    // -------------------------------------------------------------------------------------------------------

    let DayValue = {}

   

    DayValue = {
        employeeName     : employeeName    ,
        monthlySalary    : monthlySalary   ,
        salaryByDay      : salaryByDay     ,
        salaryByHour     : salaryByHour    ,
        dateOfDay        : dateOfDay       ,
        dateDay          : dateDay         ,
        dateMonth        : dateMonth       ,
        dateYear         : dateYear        ,
        dayStatus        : dayStatus       ,
        dayStatusNormal  : dayStatusNormal ,               
        dayStatusHoliday : dayStatusHoliday,               
        halfDayOff       : halfDayOff      ,               
        fullDayOff       : fullDayOff      ,               
        shiftStart       : shiftStart      ,
        shiftStartByH    : shiftStartByH   ,
        shiftStartByM    : shiftStartByM   ,
        shiftEnd         : shiftEnd        ,
        shiftEndByH      : shiftEndByH     ,
        shiftEndByM      : shiftEndByM     ,
        userLogin        : userLogin       ,
        userLoginByH     : userLoginByH    ,
        userLoginByM     : userLoginByM    ,
        userLogout       : userLogout      ,
        userLogoutByH    : userLogoutByH   ,
        userLogoutByM    : userLogoutByM   ,
        dailyLoans       : dailyLoans      ,
        userOvertime     : userOvertime    ,
        userOverMony     : userOverMony    ,
        userLate         : userLate        ,
        userLateMony     : userLateMony    ,
        dailyDiscount    : dailyDiscount   ,
        dailyExtra       : dailyExtra      ,
        dailyCoins       : dailyCoins
    
    }
    
    allDaysArray.push(DayValue)


    localStorage.setItem('vigilia-allDays',JSON.stringify(allDaysArray))


    // -------------------------------------------------------------------------------------------------------
    
    displayInfo()

    selectEmployee(employee)

}

function calcFinalPrice(){
    
    if (!salaryType.checked) {
        
        let totalLateTime = 0
        let totalOvertime = 0
        let totalLoans = 0
        let totalExtra = 0
        let totAllDiscount = 0
        let totalAllDaysDiscount = 0
        let salaryByDayOfTheUser = 0

        for (let i = 0; i < userAllDays.length; i++) {
            salaryByDayOfTheUser = userAllDays[i].salaryByDay
            totalLateTime = totalLateTime + userAllDays[i].userLate;
            totalOvertime = totalOvertime + userAllDays[i].userOvertime;
            totalExtra = totalExtra + userAllDays[i].dailyCoins

            if (userAllDays[i].dayStatus == 'Half Day Off') {

                totalLoans = totalLoans
                totalAllDaysDiscount = totalAllDaysDiscount + 0.5
                totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay/2))

            }else if(userAllDays[i].dayStatus == 'Full Day Off'){

                totalLoans = totalLoans
                totalAllDaysDiscount = totalAllDaysDiscount + 1
                totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay))


            }else{

                totalLoans = totalLoans + userAllDays[i].dailyLoans
                totalAllDaysDiscount = totalAllDaysDiscount

            }



        }

        let finalPrice = Math.round(Number(employeeSalary) + Number(totalExtra) + Number(totalLoans) + Number(totAllDiscount) + (Number(totalOvertime)*Math.round(employeeSalary/30/shiftLongTime)) - Number(totalLateTime)*Math.round(employeeSalary/30/shiftLongTime));

        document.getElementById('displayInfo').innerHTML = 
        `
        <div class="col-11 mx-auto border border-5 border-primary rounded-3">

            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-md-6 col-lg-12 my-2 d-flex justify-content-start align-items-center">Name : ${employee}</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary : ${employeeSalary} EGP</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary Day : ${Math.round(employeeSalary/30)} EGP</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary Hour : ${Math.round(employeeSalary/30/shiftLongTime)} EGP</h3>
            </div>
        
            <div class="row ps-3 py-4">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total Loans     : ${totalLoans}    EGP</h3>
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total Extras    : ${totalExtra}    EGP</h3>

                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total LateTime  : ${totalLateTime} H</h3>
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total OverTime  : ${totalOvertime} H</h3>

                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Days Off : ${totalAllDaysDiscount}    Days</h3>
                
            </div>

            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Final Salary : ${finalPrice} EGP</h3>
            </div>
    
        </div>

        `
    }else{

        let totalLateTime = 0
        let totalOvertime = 0
        let totalLoans = 0
        let totalExtra = 0
        let totAllDiscount = 0
        let totalAllDaysDiscount = 0
        let salaryByDayOfTheUser = 0

        let finalPrice1 = 0
        let finalPrice2 = 0
        let finalPrice3 = 0
        let finalPrice4 = 0

        if (userAllDays[0].dateDay==1 &&userAllDays[6].dateDay==7) {
            
            for (let i = 0; i < 7; i++) {
            
                salaryByDayOfTheUser = userAllDays[i].salaryByDay
                totalLateTime = totalLateTime + userAllDays[i].userLate;
                totalOvertime = totalOvertime + userAllDays[i].userOvertime;
                totalExtra = totalExtra + userAllDays[i].dailyCoins
    
                if (userAllDays[i].dayStatus == 'Half Day Off') {
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 0.5
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay/2))
    
                }else if(userAllDays[i].dayStatus == 'Full Day Off'){
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 1
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay))
    
    
                }else{
    
                    totalLoans = totalLoans + userAllDays[i].dailyLoans
                    totalAllDaysDiscount = totalAllDaysDiscount
    
                }
    
    
    
            }
            finalPrice1 = Math.round(Number(employeeSalary/4) + Number(totalExtra) + Number(totalLoans) + Number(totAllDiscount) + (Number(totalOvertime)*Math.round(employeeSalary/30/shiftLongTime)) - Number(totalLateTime)*Math.round(employeeSalary/30/shiftLongTime));
        }else{

            finalPrice1 = "Fill all Days..!"
        }


        totalLateTime = 0
        totalOvertime = 0
        totalLoans = 0
        totalExtra = 0
        totAllDiscount = 0
        totalAllDaysDiscount = 0
        salaryByDayOfTheUser = 0

        if (userAllDays[7].dateDay==8 &&userAllDays[13].dateDay==14) {
            
            for (let i = 7; i < 14; i++) {

                salaryByDayOfTheUser = userAllDays[i].salaryByDay
                totalLateTime = totalLateTime + userAllDays[i].userLate;
                totalOvertime = totalOvertime + userAllDays[i].userOvertime;
                totalExtra = totalExtra + userAllDays[i].dailyCoins
    
                if (userAllDays[i].dayStatus == 'Half Day Off') {
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 0.5
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay/2))
    
                }else if(userAllDays[i].dayStatus == 'Full Day Off'){
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 1
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay))
    
    
                }else{
    
                    totalLoans = totalLoans + userAllDays[i].dailyLoans
                    totalAllDaysDiscount = totalAllDaysDiscount
    
                }
    
    
    
            }

            finalPrice2 = Math.round(Number(employeeSalary/4) + Number(totalExtra) + Number(totalLoans) + Number(totAllDiscount) + (Number(totalOvertime)*Math.round(employeeSalary/30/shiftLongTime)) - Number(totalLateTime)*Math.round(employeeSalary/30/shiftLongTime));

        }else{

            finalPrice2 = "Fill all Days..!"
        }
        
        totalLateTime = 0
        totalOvertime = 0
        totalLoans = 0
        totalExtra = 0
        totAllDiscount = 0
        totalAllDaysDiscount = 0
        salaryByDayOfTheUser = 0

        if (userAllDays[14].dateDay==15 &&userAllDays[20].dateDay==21) {
            
            for (let i = 14; i < 21; i++) {

                salaryByDayOfTheUser = userAllDays[i].salaryByDay
                totalLateTime = totalLateTime + userAllDays[i].userLate;
                totalOvertime = totalOvertime + userAllDays[i].userOvertime;
                totalExtra = totalExtra + userAllDays[i].dailyCoins
    
                if (userAllDays[i].dayStatus == 'Half Day Off') {
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 0.5
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay/2))
    
                }else if(userAllDays[i].dayStatus == 'Full Day Off'){
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 1
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay))
    
    
                }else{
    
                    totalLoans = totalLoans + userAllDays[i].dailyLoans
                    totalAllDaysDiscount = totalAllDaysDiscount
    
                }
    
    
    
            }

            finalPrice3 = Math.round(Number(employeeSalary/4) + Number(totalExtra) + Number(totalLoans) + Number(totAllDiscount) + (Number(totalOvertime)*Math.round(employeeSalary/30/shiftLongTime)) - Number(totalLateTime)*Math.round(employeeSalary/30/shiftLongTime));

        }else{

            finalPrice3 = "Fill all Days..!"

        }
        

        totalLateTime = 0
        totalOvertime = 0
        totalLoans = 0
        totalExtra = 0
        totAllDiscount = 0
        totalAllDaysDiscount = 0
        salaryByDayOfTheUser = 0

        if (userAllDays[21].dateDay==22 &&userAllDays[27].dateDay==28) {
            
            for (let i = 21; i < 31; i++) {

               if (userAllDays[i]) {
                
                salaryByDayOfTheUser = userAllDays[i].salaryByDay
                totalLateTime = totalLateTime + userAllDays[i].userLate;
                totalOvertime = totalOvertime + userAllDays[i].userOvertime;
                totalExtra = totalExtra + userAllDays[i].dailyCoins
    
                if (userAllDays[i].dayStatus == 'Half Day Off') {
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 0.5
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay/2))
    
                }else if(userAllDays[i].dayStatus == 'Full Day Off'){
    
                    totalLoans = totalLoans
                    totalAllDaysDiscount = totalAllDaysDiscount + 1
                    totAllDiscount = totAllDiscount+ -(Math.round(userAllDays[i].salaryByDay))
    
    
                }else{
    
                    totalLoans = totalLoans + userAllDays[i].dailyLoans
                    totalAllDaysDiscount = totalAllDaysDiscount
    
                }

               }
    
            }

            finalPrice4 = Math.round(Number(employeeSalary/4) + Number(totalExtra) + Number(totalLoans) + Number(totAllDiscount) + (Number(totalOvertime)*Math.round(employeeSalary/30/shiftLongTime)) - Number(totalLateTime)*Math.round(employeeSalary/30/shiftLongTime));
        
        }else{
        
            finalPrice4 = "Fill all Days..!"
        
        }
        

        totalLateTime = 0
        totalOvertime = 0
        totalLoans = 0
        totalExtra = 0
        totAllDiscount = 0
        totalAllDaysDiscount = 0
        salaryByDayOfTheUser = 0

        document.getElementById('displayInfo').innerHTML = 
        `
        <div class="col-11 mx-auto border border-5 border-primary rounded-3">

            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-md-6 col-lg-12 my-2 d-flex justify-content-start align-items-center">Name : ${employee}</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary : ${employeeSalary} EGP</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary Day : ${Math.round(employeeSalary/30)} EGP</h3>
                <h3 class="col-md-6 col-lg-4 my-2 d-flex justify-content-start align-items-center">Salary Hour : ${Math.round(employeeSalary/30/shiftLongTime)} EGP</h3>
            </div>
        
            <div class="row ps-3 py-4">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total Loans     : ${totalLoans}    EGP</h3>
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total Extras    : ${totalExtra}    EGP</h3>

                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total LateTime  : ${totalLateTime} H</h3>
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Total OverTime  : ${totalOvertime} H</h3>

                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Days Discount : ${totalAllDaysDiscount}    Days</h3>
            </div>

            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Week-1 : ${finalPrice1} EGP</h3>
            </div>
            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Week-2 : ${finalPrice2} EGP</h3>
            </div>
            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Week-3 : ${finalPrice3} EGP</h3>
            </div>
            <div class="row ps-3 bg-primary py-3">
                <h3 class="col-12  my-3"><span class="fw-bolder me-2">Week-4 : ${finalPrice4} EGP</h3>
            </div>
    
        </div>

        `

    }
}

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------


/*

*/







































