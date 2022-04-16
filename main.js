function Disable(id) {
    document.getElementById(id).setAttribute('disabled', 'disabled');
};
function Reable(id) {
    document.getElementById(id).removeAttribute('disabled');
};


//内部函数
function GetChartPtt(basePotential = new Number, score = new Number) {
    let chartPtt = new Number;
    if (score > 10000000) {chartPtt = basePotential + 2;}
else if (score >= 9800000) {chartPtt = basePotential + 1 + (score - 9800000) / 200000;}
else if (basePotential + (score - 9500000) / 300000 > 0) {chartPtt = basePotential + (score - 9500000) / 300000;}
    else {chartPtt = 0;}
    return chartPtt
};
function Getscore(basePotential = new Number, chartPtt = new Number) {
    let score = new Number;
    if (chartPtt >= basePotential + 1) {score = 200000 * (chartPtt - basePotential - 1) + 9800000;}
    else {score = 300000 * (chartPtt - basePotential) + 9500000;}
    return Math.round(score)
};


//供HTML调用
function PTTs(btid) {

    let bt1 = 'getchtptt',
        bt2 = 'getscore',
        bt3 = 'getr10',
        bt4 = 'getb30',
        basePTT = Number(document.getElementById('baseptt').value),
        score = Number(document.getElementById('score').value),
        chartPtt = Number(document.getElementById('chartptt').value),
        goalPTT = Number(document.getElementById('goalptt').value),
        b30 = Number(document.getElementById('best30').value),
        r10 = Number(document.getElementById('recent10').value);
        
    if (btid == bt1) {
        document.getElementById('getchtptt').innerHTML = '单曲ptt为：' + GetChartPtt(basePTT, score);}
    if (btid == bt2) {
        document.getElementById('getscore').innerHTML = '所需分数为：' + Getscore(basePTT, chartPtt);}
    if (btid == bt3) {
        let result_r10 = (goalPTT * 40 - b30 * 30) / 10;
        document.getElementById('getr10').innerHTML = '所需r10为：' + result_r10;}
    if (btid == bt4) {
        let result_b30 = (goalPTT * 40 - r10 * 10) / 30;
        document.getElementById('getb30').innerHTML = '所需b30为：' + result_b30;}
};


function WorldSteps (btid) {
    
    let bt1 = 'getsteps',
        bt2 = 'getplayrt',
        playRating = Number(document.getElementById('playrt').value),
        waifuStep = Number(document.getElementById('waifustep').value),
        stamina = Number(document.getElementById('stamina').value),
        frag = Number(document.getElementById('frag').value),
        X4 = Number(document.getElementById('X4').value),
        actualSteps = Number(document.getElementById('actualsteps').value),
        bonus = stamina * frag * X4,

        baseSteps = 2.5 + Math.sqrt(6 * playRating),
        result_1 = baseSteps * (waifuStep/50) * bonus,
        final_1 = result_1.toFixed(3),

        result_2 = Math.pow(actualSteps / ((waifuStep/50) * bonus) - 2.5, 2) / 6,
        final_2 = result_2.toFixed(3);

    if (btid == bt1 && playRating>=0 && waifuStep>0) {
        document.getElementById('getsteps').innerHTML = '预计最终步数为：' + final_1;
    }
    if (btid == bt2 && actualSteps>0 && waifuStep>0) {
        document.getElementById('getplayrt').innerHTML = '所需结算ptt为：' + final_2;
    }
};


function BydPercent(btid) {

    let bt1 = 'getperc',
        bt2 = 'getmapfac',
        playRating = Number(document.getElementById('playrtbyd').value),
        waifuOver = Number(document.getElementById('waifuover').value),
        waifuAffi = Number(document.getElementById('waifuaffi').value),
        mapFactor = Number(document.getElementById('mapfac').value),
        boost = Number(document.getElementById('boost').value),
        clearFactor = Number(document.getElementById('clearfac').value),
        actualPerc = Number(document.getElementById('actualperc').value),

        basePercent = (2.5 * clearFactor + Math.sqrt(6 * playRating)) * (waifuOver/50) * waifuAffi * boost,
        result_1 = basePercent / mapFactor,
        final_1 = result_1.toFixed(2) + '%',

        result_2 = basePercent / actualPerc,
        final_2 = result_2.toFixed(1);

    if (btid == bt1 && playRating>=0 && waifuOver>0) {
        document.getElementById('getperc').innerHTML = '预计爬升百分比为：' + final_1;
    }
    if (btid == bt2 && actualPerc>0 && waifuOver>0) {
        document.getElementById('getmapfac').innerHTML = '推算地图系数为：' + final_2;
    }
};


function CtrlPFL() {

    let notes = Number(document.getElementById('ctrlnotes').value),
        basePTT = Number(document.getElementById('ctrlbaseptt').value),
        ctrlPtt = Number(document.getElementById('ctrlptt').value),
        ctrlScore = Number(document.getElementById('ctrlscore').value),
        ctrlType = document.getElementById('ctrltype').value,
        ctrlScore_fromPtt = new Number, npure = new Number, far = new Number, lost = new Number;

    if (ctrlType == '不超ptt' && notes > 0 && ctrlPtt > 0 && basePTT > 0) {
        ctrlScore_fromPtt = Getscore(basePTT, ctrlPtt);
        npure = (10000000 - ctrlScore_fromPtt) / (10000000 / notes);
        npure = npure.toFixed(1);
        lost = Math.round(npure);
        if (npure - lost > 0) {far = Math.round((npure - lost) / 0.5);} else {far = 0;}
        addtion = '<br>需要控分 ≤ ' + ctrlScore_fromPtt;
    }
    if (ctrlType == '不超分' && notes > 0 && ctrlScore > 0) {
        npure = (10000000 - ctrlScore) / (10000000 / notes);
        npure = npure.toFixed(1);
        lost = Math.round(npure);
        if (npure - lost > 0) {far = Math.round((npure - lost) / 0.5);} else {far = 0;}
        addtion = '<br>单曲ptt ≤ ' + GetChartPtt(basePTT, ctrlScore);
    }

    document.getElementById('getctrl').innerHTML = '所需非Pure：' + npure + '<br>所需Far：' + far + '<br>所需Lost：' + lost + addtion;
};

function BasePotential() {

    let songName = document.getElementById('songname').value,
        diffType = document.getElementById('difftype').value,
        diff = document.getElementById('diff').value,
        playScore = Number(document.getElementById('playscore').value),
        waifuStep = Number(document.getElementById('step').value),
        stepsBefore = Number(document.getElementById('stepsbefore').value),
        stepsAfter = Number(document.getElementById('stepsafter').value),

        stepsCeiling = Math.min(stepsBefore + 0.1, (stepsAfter + 0.1) / waifuStep * 50),
        stepsFloor = Math.max(stepsBefore, stepsAfter / waifuStep * 50),
        basePttDiffer = new Number;

    if (playScore < 9800000) {basePttDiffer = (playScore - 9500000) / 300000;}
else if (playScore < 10000000) {basePttDiffer = 1 + (playScore - 9800000) / 200000;}
    else {basePttDiffer = 2}

    let baseCeiling = Math.pow(stepsCeiling - 2.5, 2) / 6 - basePttDiffer,
        baseFloor = Math.pow(stepsFloor - 2.5, 2) / 6 - basePttDiffer,
        result = ((Math.ceil(baseFloor * 10)/ 10 + Math.floor(baseCeiling * 10)/ 10)/ 2) * 10 / 10,
        final = result.toFixed(1);
    
    if (playScore * waifuStep * stepsBefore * stepsAfter > 0) {
        document.getElementById('stepsceiling').value = stepsCeiling;
        document.getElementById('stepsfloor').value = stepsFloor;
        document.getElementById('baseceiling').value = baseCeiling;
        document.getElementById('basefloor').value = baseFloor;
        document.getElementById('getbase').innerHTML = '综上，' + songName + ' [' + diffType + ' ' + diff + '] 的谱面定数估测值为：' + final
    }
};


/*夜间模式*/
//页面加载完成后执行自动切换
window.onload = function () {
    AutoDarker();
}
//手动切换
function Darker() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
    }
    else {
        document.body.classList.add('dark-theme');
    }
};
//自动切换
function AutoDarker() {
    var hour = new Date().getHours();
    if (hour <= 5 || hour >= 22) {
        document.body.classList.add('dark-theme');
        }
};



//清空元素.找不出bug原因,放置中,typeerror (...).setAttribute is not a function
//function CleanAllresults() {document.getElementsByClassName('result').setAttribute('color','white');}
