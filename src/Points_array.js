// Profiles Table
var userType = '';
var timeDuration = '';
var employementStatus = '';
var annualIncome = '';
var financialAssets = '';
var financialLiabilities = '';

// Investment Tables
var type = '';
var amount = '';
var startDate = '';
var endDate = '';
var riskLevel = '';
var goal = '';


// ---------------USER TYPE
//  Non-Qualified: If Q9,10,11,12 not ans.
//  Inform User: IF Q15 || 16 || 17 || 18 => ans
//  Advance User: IF Q15 || 16 || 17 || 18 => >= 3

// ---------------Investment Type
// can_buy_bond_funds: IF Only Q13 = ans
// can_buy_separate_bonds: IF Q13 = 1 && investor_category = Informed
// can_buy_stock_funds: If Only Q14 = 1
// can_buy_life_insurance: If Only Q14 = 1 && investor_category = informed

function pointsChecker(data) {
    const arr = [];
    Object.entries(data).forEach(([key, value]) => {
        arr.push({ name: key, value: value });
    });

    // User Type
    const q9 = arr.some(dt => dt.name === 'name9' && dt.value !== 'more than 200000$');
    const q10 = arr.some(dt => dt.name === 'name10' && dt.value !== 'More risky.');
    const q11 = arr.some(dt => dt.name === 'name11' && dt.value !== 'By diversifying investments into multiple underlying investments.');
    const q12 = arr.some(dt => dt.name === 'name12' && dt.value !== 'A product that combines life insurance with investment, where the return is usually not guaranteed and loss can occur.');
    const non_qualified = q9 && q10 && q11 && q12
    // console.log("The User Type is: ", non_qualified);

    var ad_points = 0;

    const q15 = arr.some(dt => dt.name === 'name15' && dt.value.length !== 0);
    q15 && (ad_points += 1); // Increment ad_points if q15 is true

    const q16 = arr.some(dt => dt.name === 'name16' && dt.value !== '');
    q16 && (ad_points += 1); // Increment ad_points if q16 is true

    const q17 = arr.some(dt => dt.name === 'name17' && dt.value !== '');
    q17 && (ad_points += 1); // Increment ad_points if q17 is true

    const q18 = arr.some(dt => dt.name === 'name18' && dt.value !== '');
    q18 && (ad_points += 1); // Increment ad_points if q17 is true
    const Inform = q15 || q16 || q17 || q18;
    if (non_qualified) {
        userType = 'Non_qualified'
    }
    else if (ad_points >= 3) {
        userType = 'Advance'
    }
    else if (Inform) {
        userType = 'Inform'
    }
    else {
        userType = 'Default'
    }
    // console.log("The User Type is: ", userType);

    // Investment Types 
    const q13 = arr.some(dt => dt.name === 'name13' && dt.value.length !== 0);
    const q14 = arr.some(dt => dt.name === 'name14' && dt.value.length !== 0);
    if (!non_qualified && !ad_points >= 3 && !Inform && q13) {
        type = 'bonds'
    }
    else if (q13 && userType == 'Inform') {
        type = 'Separate_bonds'
    }
    else if (q14 && userType == 'Inform') {
        type = 'Life_insurance'
    }
    else if (!non_qualified && !ad_points >= 3 && !Inform && q14) {
        type = 'Stock_bonds'
    }
    console.log("Bond type is: ", type);




    // FinalAssets = name9
    const fin_asset = arr.find((dt) => dt.name == 'name9')
    console.log("The fin asset is: ", fin_asset?.value);
    financialAssets = fin_asset?.value
    // timeDuration = name3
    const time_duration = arr.find((dt) => dt.name == 'name3')
    timeDuration = time_duration?.value.startsWith("I don't know") ? "More than 5 years" : (time_duration?.value.startsWith("Long-term") && "All")
    console.log("The time duration is: ", timeDuration);
    // employementStatus = name6
    const emplye_status = arr.find((dt) => dt.name == 'name6')
    employementStatus = emplye_status?.value
    console.log("The Employement status is: ", employementStatus);
    // annualIncome = name7
    const annual_income = arr.find((dt) => dt.name == 'name7')
    annualIncome = annual_income?.value
    console.log("The anuual income is: ", annualIncome);


    var profile_table = { userType, timeDuration, employementStatus, annualIncome, financialAssets, financialLiabilities }

    var investment_table = {
        type, amount, startDate, endDate, riskLevel, goal
    }

    return [profile_table, investment_table]
}

export default pointsChecker



