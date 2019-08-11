var medsys = ["System", "Cardiovascular", "Respiratory", "Digestive", "Neurologic", "Metabolic", "Hematologic", "Genitourinary", "Sepsis", "Trauma", "Miscellaneous"];
var chisys = ["System", "Cardiovascular", "Respiratory", "Digestive", "Neurosurgery", "Genitourinary", "Trauma", "Miscellaneous"];

var meddia = [
  ["Diagnosis"],
  ["Diagnosis", "AMI Ant", "AMI Inf/Lat", "AMI Non-Q", "AMI Other", "Cardiac Arrest", "Cardiogenic Shock", "Cardiomyopathy", "Congestive HF", "Chest Pain, rule out MI", "Hypertension", "Hypovolemia", "Hemorrhage", "Aortic Aneuysm", "Peripheral Vascular Disease", "Rythm Disturbance", "Cardiac Drug Toxicity", "Unstable Angina", "Other"],
  ["Diagnosis", "Airway Obstruction", "Asthma", "Aspiration Pneumonia", "Bacterial Pneumonia", "Viral Pneumonia", "Parasitic/Fungal Pneumonia", "COPD", "Pleural Effusion", "Edema noncardiac", "Embolism", "Respiratory Arrest", "Cancer (lung, ENT)", "Restrictive Disease", "Other"],
  ["Diagnosis", "Upper Bleeding", "Lower Bleeding", "Variceal Bleeding", "Inflammatory Disease", "Neoplasm", "Obstruction", "Perforation", "Vascular Insufficiency", "Hepatic Failure", "Intra/Retroperitoneal Bleeding", "Pancreatitis", "Other"],
  ["Diagnosis", "Intracerebral Hemorrhage", "Neoplasm", "Infection", "Neuromuscular Disease", "Drug Overdose", "Subdural/Epidural Hematoma", "SAH, Aneurysm", "Seizure", "Stroke", "Other"],
  ["Diagnosis", "Acid-base/Electrolyte Disorder", "Diabetic Ketoacidosis", "Hyperosmolar Diabetic Coma", "Other"],
  ["Diagnosis", "Coagulopathy, Neutro-/Thrombocyto-/Pancytopenia", "Other"],
  ["Diagnosis", "Renal/Other"],
  ["Diagnosis", "Cutaneous", "Gastrointestinal", "Pulmonary", "Urinary", "Other", "Unknown"],
  ["Diagnosis", "Head with Chest/Abdomen/Pelvis/Spine", "Head with Face/Extremity", "Head only", "Head with multi-trauma", "Chest and Spine", "Spine only", "Multitrauma (no Head)"],
  ["Diagnosis", "General/Other"],
];

var vmeddia = [
  ["0"],
  ["0", "0.085768512", "-0.036016015", "-0.057916835", "0", "-0.751470488", "0.329989886", "0.557005388", "-0.219091549", "-0.520128136", "-0.067961418", "-0.389881468", "-0.381155309", "1.310621507", "0.844326529", "-0.302546395", "-0.882634505", "-0.368981979", "-0.132883369"],
  ["0", "0.347148464", "-0.542185912", "0.860258427", "1.306744601", "1.156064757", "1.619700546", "-0.446092483", "0.810093029", "1.44275094", "0.106834049", "-0.053291846", "-0.140474342", "1.024903996", "0.240490909"],
  ["0", "0.021360405", "0.185696594", "-0.083385343", "0.532982522", "1.336831287", "2.06861446", "2.208699567", "1.944060834", "0.194945835", "0.165265635", "2.762688675", "0.556588745"],
  ["0", "0.86329482", "0.974847187", "1.16556532", "3.92566043", "-0.89006849", "1.195315097", "3.00860876", "-0.330810671", "0.313233793", "0.357504381"],
  ["0", "-0.382017407", "-0.58421484", "-0.081962609", "-0.363969853"],
  ["0", "0.399817416", "-0.126173954"],
  ["0", "-0.152233731"],
  ["0", "1.56421957", "1.245313673", "1.926647999", "0.453137242", "0.649077107", "0.402590257"],
  ["0", "2.128908172", "0.860033343", "0.834081141", "3.637560295", "2.574268317", "2.168142671", "1.521187936"],
  ["0", "-0.420843422"],
];

var v2meddia = [
  ["0"],
  ["0", "0.102949765", "-0.152525079", "-0.270872458", "0", "0.416919141", "0.239711427", "0.059962444", "-0.422587793", "-1.122354572", "-0.813921325", "-0.622592285", "-0.656757432", "0.649149305", "-0.502752032", "-0.603060945", "-0.690943246", "-1.212730735", "-0.369658509"],
  ["0", "-0.977669154", "-1.540678498", "-0.37223658", "-0.043365914", "0.254374904", "1.056187347", "-0.398697453", "0.189900524", "-0.2416873", "-0.051527401", "-0.390631425", "0.966313802", "1.55529658", "-0.202823617"],
  ["0", "-0.551832894", "-0.579471867", "-0.527719358", "-0.211771894", "0.195130291", "-0.369945003", "-0.327171182", "0.714879336", "-0.119675791", "-0.659544401", "-0.513627563", "-0.252586643"],
  ["0", "0.945056155", "0.018952727", "-0.535783229", "-0.550653067", "-1.55261952", "0.295093901", "0.615950385", "-0.942170992", "0.519453035", "-0.176828697"],
  ["0", "-0.640575517", "-1.775702142", "-0.927156778", "-0.986438209"],
  ["0", "0.258172435", "-0.342352862"],
  ["0", "-0.54158014"],
  ["0", "0.126440315", "-0.13010935", "-0.258766455", "-0.732788506", "-0.04233671", "-0.093377498"],
  ["0", "-0.372350315", "-0.364128015", "0.595869416", "-0.067960926", "-0.717432122", "0.033769484", "-0.678110274"],
  ["0", "-0.667576408"],
];

var chidia = [
  ["Diagnosis"],
  ["Diagnosis", "Heart Valve", "CABG with double/redo Valve", "CABG with Single Valve", "Aortic Aneurysm, Elective", "Aortic Aneurysm, Ruptured", "Aortic Aneurysm, Dissection", "Femoro-popeliteal Bypass", "Aorto-iliac/-femoral Bypass", "Peripheral Ischemia", "Carotid", "Other"],
  ["Diagnosis", "Thoracotomy (Malignancy)", "ENT Neoplasm", "Thoracotomy (Lung biopy/Pleural Disease)", "Thoracotomy (Infection)", "Other"],
  ["Diagnosis", "Malignancy", "Bleeding", "Fistula/Abcess", "Cholecystitis/Cholangitis", "GI Inflammation", "Obstruction", "Perforation", "Ischemia", "Liver Transplant", "Other"],
  ["Diagnosis", "Neoplasm (Craniotomy/Transphenoidal)", "Intracranial Hemorrhage", "SAH (Aneurysm/AVM)", "Subdural/Epidural Hematoma", "Spinal Cord Surgery", "Other"],
  ["Diagnosis", "Neoplasm (Renal/Bladder/Prostate)", "Renal Transplant", "Hysterectomy", "Other"],
  ["Diagnosis", "Head Only", "Multitrauma with Head", "Extremity", "Multitrauma (no Head)"],
  ["Diagnosis", "Amputation (nontraumatic"],
];

var vchidia = [
  ["0"],
  ["0", "-2.076438218", "-0.332456954", "-1.358289429", "0.773946463", "2.77663888", "1.110021457", "-0.204188913", "0.52392239", "0.102293462", "-0.14649332", "-1.28358348"],
  ["0", "0.199925455", "-0.053892181", "0.185974867", "0.044451048", "-0.359443815"],
  ["0", "0.324865875", "-0.045403893", "0.719937797", "-0.588512311", "0.686936442", "0.187304735", "1.055374625", "0.62069525", "-0.848656603", "0.217044719"],
  ["0", "0.319065119", "2.949869569", "2.599592539", "1.342344962", "-0.251392367", "0.551331225"],
  ["0", "-0.423760975", "-0.556650506", "-0.162493249", "-0.58901834"],
  ["0", "2.102182643", "3.20631279", "-0.481004907", "1.485430308"],
  ["0", "-0.325703861"],
];

var v2chidia = [
  ["0"],
  ["0", "-1.371763972", "-0.155141644", "-1.99434806", "-0.760703396", "0.204404736", "-0.178456475", "-0.786571016", "-0.831194514", "-0.504208244", "-1.332642438", "-0.59044574"],
  ["0", "0.086933576", "-1.152870135", "0.405738008", "-0.005937516", "-0.249217228"],
  ["0", "0.136282662", "-0.329679773", "-0.556661177", "-0.593293673", "-0.165585527", "-0.189005132", "-0.189960264", "0.498328014", "-1.370278559", "-0.295894316"],
  ["0", "-0.437737676", "0.52671741", "0.318905704", "0.715682622", "-0.628609547", "0.003996339"],
  ["0", "-1.397212695", "-1.308449407", "-0.795847883", "-0.693574061"],
  ["0", "1.088819324", "0.357797735", "-0.180386981", "-0.377807998"],
  ["0", "0.604910303"],
];

var disp = 0;
function helpapp() {
  if (disp == 0) {
    document.getElementById('tl').style.display = "block";
    disp = 1;
    visi = "hidden";
  }

  else {
    document.getElementById('tl').style.display = "none";
    disp = 0;
    visi = "visible";
  }
  document.apa.gce.style.visibility = visi;
  document.apa.gcv.style.visibility = visi;
  document.apa.gcm.style.visibility = visi;
  document.apa.ori.style.visibility = visi;
  document.apa.sys.style.visibility = visi;
  document.apa.gno.style.visibility = visi;
}

var sho = 0;
function gradapp() {
  if (sho == 0) {
    document.getElementById('grad').style.display = "block";
    sho = 1;
    vis = "hidden";
  }

  else {
    document.getElementById('grad').style.display = "none";
    sho = 0;
    vis = "visible";
  }

  document.apa.gce.style.visibility = vis;
  document.apa.gcv.style.visibility = vis;
  document.apa.gcm.style.visibility = vis;
}

function defgcs() {
  if (document.apa.sed.checked == true) {
    document.getElementById("tabgla1").style.color = "#999999";
    document.getElementById("tabgla2").style.color = "#999999";
    document.getElementById("tabgla3").style.color = "#999999";
    document.apa.gce.disabled = true;
    document.apa.gcv.disabled = true;
    document.apa.gcm.disabled = true;
  }
  else {
    document.getElementById("tabgla1").style.color = "";
    document.getElementById("tabgla2").style.color = "";
    document.getElementById("tabgla3").style.color = "";
    document.apa.gce.disabled = false;
    document.apa.gcv.disabled = false;
    document.apa.gcm.disabled = false;
  }
}

var ci = 0;
function defsys() {
  var l, k;
  l = document.apa.typ.length;

  for (k = 0; k < l; k++) {
    if (document.apa.typ[k].checked) { c = document.apa.typ[k].value; }
  }

  s = document.apa.sys.selectedIndex;

  opts = document.apa.sys;
  opts2 = document.apa.gno;
  t = opts.length;
  h = opts2.length;

  if (ci != c) {
    for (u = 0; u < t; u++) { opts.remove(0); }
    for (w = 0; w < h; w++) { opts2.remove(0); }

    if (c == 1) {
      z = medsys.length;
      for (p = 0; p < z; p++) {
        var opt = new Option(medsys[p], p);
        opts.add(opt, p);
        ci = 1;
      }
      if (s <= 4) { s += 0 }
      if (s == 5) { s = 7 }
      if (s == 6) { s = 9 }
      if (s == 7) { s = 10 }
      document.apa.sys.selectedIndex = s;
      z = meddia[s].length;
      for (p = 0; p < z; p++) {
        opt2 = new Option(meddia[s][p], p);
        opts2.add(opt2, p);
      }
    }

    if (c == 2) {
      z = chisys.length;
      for (p = 0; p < z; p++) {
        var opt = new Option(chisys[p], p);
        opts.add(opt, p);
        ci = 2;
      }
      if (s <= 4) { s += 0 }
      if (s == 5 || s == 6 || s == 8) { s = 0 }
      if (s == 7) { s = 5 }
      if (s == 9) { s = 6 }
      if (s == 10) { s = 0 }
      document.apa.sys.selectedIndex = s;
      z = chidia[s].length;
      for (p = 0; p < z; p++) {
        opt2 = new Option(chidia[s][p], p);
        opts2.add(opt2, p);
      }
    }
  }
}

function defdiag() {
  var l, k;
  l = document.apa.typ.length;
  for (k = 0; k < l; k++) {
    if (document.apa.typ[k].checked) { c = document.apa.typ[k].value; }
  }

  s = document.apa.sys.selectedIndex;

  opts = document.apa.gno;
  t = opts.length;

  for (u = 0; u < t; u++) { opts.remove(0); }

  if (c == 1) {
    z = meddia[s].length;
    for (p = 0; p < z; p++) {
      var opt = new Option(meddia[s][p]);
      opts.add(opt, p);
    }
  }

  if (c == 2) {
    z = chidia[s].length;
    for (p = 0; p < z; p++) {
      var opt = new Option(chidia[s][p]);
      opts.add(opt, p);
    }
  }
}

function defthro() {
  var l, k;
  l = document.apa.typ.length;
  for (k = 0; k < l; k++) {
    if (document.apa.typ[k].checked) { c = document.apa.typ[k].value; }
  }

  s = document.apa.sys.selectedIndex;
  d = document.apa.gno.selectedIndex;

  if (c == 1 && s == 1) {
    if (d == 1 || d == 2 || d == 3 || d == 4) {
      document.getElementById("tabthr").style.color = "";
      document.getElementById("tabthr2").style.color = "";
      document.apa.thr[0].disabled = false;
      document.apa.thr[1].disabled = false;
    }
    else {
      document.getElementById("tabthr").style.color = "#999999";
      document.getElementById("tabthr2").style.color = "#999999";
      document.apa.thr[0].checked = true;
      document.apa.thr[0].disabled = true;
      document.apa.thr[1].disabled = true;
    }
  }
  else {
    document.getElementById("tabthr").style.color = "#999999";
    document.getElementById("tabthr2").style.color = "#999999";
    document.apa.thr[0].checked = true;
    document.apa.thr[0].disabled = true;
    document.apa.thr[1].disabled = true;
  }
}

function apachcalc() {
  var age, tem, pam, hr, rr, fio, oxy, pco, pha, nas, ure, cre, uri, bsl, alb, bil, hto, wbc, sed, gce, gcv, gcm, los;
  var sco, aps, age1, age2, age3, age4, age5, aps1, aps2, aps3, aps4, aps5, x;

  age = 1 * document.apa.age.value;
  tem = 1 * document.apa.tem.value;
  map = 1 * document.apa.map.value;
  hr = 1 * document.apa.hr.value;
  rr = 1 * document.apa.rr.value;
  fio = 1 * document.apa.fio.value;
  oxy = 1 * document.apa.oxy.value;
  pco = 1 * document.apa.pco.value;
  pha = 1 * document.apa.pha.value;
  nas = 1 * document.apa.nas.value;
  ure = 1 * document.apa.ure.value;
  cre = 1 * document.apa.cre.value;
  uri = 1 * document.apa.uri.value;
  bsl = 1 * document.apa.bsl.value;
  alb = 1 * document.apa.alb.value;
  bil = 1 * document.apa.bil.value;
  hto = 1 * document.apa.hto.value;
  wbc = 1 * document.apa.wbc.value;
  gce = 1 * document.apa.gce.value;
  gcv = 1 * document.apa.gcv.value;
  gcm = 1 * document.apa.gcm.value;

  quo = 1 * document.apa.quo.value;
  patm = 1 * document.apa.patm.value;

  los = 1 * document.apa.los.value;
  ori = 1 * document.apa.ori.value;

  if (document.apa.rea[0].checked) { rea = 0 }
  else { rea = 1 }

  if (document.apa.eme[0].checked) { eme = 0 }
  else { eme = 1 }

  if (document.apa.thr[0].checked) { thr = 0 }
  if (document.apa.thr[1].checked) { thr = 1 }

  c = "";
  var l, k;
  l = document.apa.typ.length;
  for (k = 0; k < l; k++) {
    if (document.apa.typ[k].checked) { c = document.apa.typ[k].value; }
  }

  s = document.apa.sys.selectedIndex;
  d = document.apa.gno.selectedIndex;

  sco = 0;

  age1 = 0;
  age2 = 0;
  age3 = 0;
  age4 = 0;
  age5 = 0;
  aps1 = 0;
  aps2 = 0;
  aps3 = 0;
  aps4 = 0;
  aps5 = 0;
  los1 = 0;
  los2 = 0;
  los3 = 0;
  los4 = 0;

  aad = (fio / 100) * (patm - 47) - (pco / quo) - oxy;
  gla = gce + gcv + gcm;

  var mod, len;
  mod = "";
  len = document.apa.ven.length;

  for (i = 0; i < len; i++) {
    if (document.apa.ven[i].checked) { mod = document.apa.ven[i].value; }
  }

  if (document.apa.crf.checked) { hem = 2 }
  else { hem = 1 }

  var sed;
  if (document.apa.sed.checked == true) { sed = "na"; }
  else { sed = "a"; }

  if (tem == "") { alert("Input Temperature"); }
  else {
    if (tem < 33) { sco += 20; }
    else if (tem < 33.5) { sco += 16; }
    else if (tem < 34) { sco += 13; }
    else if (tem < 35) { sco += 8; }
    else if (tem < 36) { sco += 2; }
    else if (tem < 40) { sco += 0; }
    else { sco += 4; }
  }

  if (map == "") { alert("Input MAP"); }
  else {
    if (map <= 39) { sco += 23; }
    else if (map < 60) { sco += 15; }
    else if (map < 70) { sco += 7; }
    else if (map < 80) { sco += 6; }
    else if (map < 100) { sco += 0; }
    else if (map < 120) { sco += 4; }
    else if (map < 130) { sco += 7; }
    else if (map < 140) { sco += 9; }
    else { sco += 10; }
  }

  if (hr == "") { alert("Input HR"); }
  else {
    if (hr < 40) { sco += 8; }
    else if (hr < 50) { sco += 5; }
    else if (hr < 100) { sco += 0; }
    else if (hr < 110) { sco += 1; }
    else if (hr < 120) { sco += 5; }
    else if (hr < 140) { sco += 7; }
    else if (hr < 155) { sco += 13; }
    else { sco += 17; }
  }
  document.apa.sco.value = sco;
  if (rr == "") { alert("Input RR"); }
  else {
    if (rr <= 5) { sco += 17; }
    else if (rr < 12) { sco += 8; }
    else if (rr < 14) { sco += 7; }
    else if (rr < 25) { sco += 0; }
    else if (rr < 35) { sco += 6; }
    else if (rr < 40) { sco += 9; }
    else if (rr < 50) { sco += 11; }
    else { sco += 18; }
  }

  if (mod == "") { alert("Select Ventilation Mode"); }
  if (fio == "") { alert("Input FiO2"); }
  if (oxy == "") { alert("Input pO2"); }
  if (pco == "") { alert("Input pCO2"); }
  else {
    if (mod == "a") {
      if (oxy < 50) { sco += 15; }
      else if (oxy < 70) { sco += 5; }
      else if (oxy < 80) { sco += 2; }
      else { sco += 0; }
    }
    if (mod == "b") {
      if (fio >= 50) {
        if (aad < 100) { sco += 0; }
        else if (aad < 250) { sco += 7; }
        else if (aad < 350) { sco += 9; }
        else if (aad < 500) { sco += 11; }
        else { sco += 14; }
      }
      if (fio < 50) {
        if (oxy < 50) { sco += 15; }
        else if (oxy < 70) { sco += 5; }
        else if (oxy < 80) { sco += 2; }
        else { sco += 0; }
      }
    }
  }
  document.apa.sco.value = sco;
  if (pha == "") { alert("Input pH"); }
  else {
    if (pha < 7.2) {
      if (pco < 50) { sco += 12; }
      else { sco += 4; }
    }
    else if (pha < 7.3) {
      if (pco < 30) { sco += 9; }
      else if (pco < 40) { sco += 6; }
      else if (pco < 50) { sco += 3; }
      else { sco += 2; }
    }
    else if (pha < 7.35) {
      if (pco < 30) { sco += 9; }
      else if (pco < 45) { sco += 0; }
      else { sco += 1; }
    }
    else if (pha < 7.45) {
      if (pco < 30) { sco += 5; }
      else if (pco < 45) { sco += 0; }
      else { sco += 1; }
    }
    else if (pha < 7.5) {
      if (pco < 30) { sco += 5; }
      else if (pco < 35) { sco += 0; }
      else if (pco < 45) { sco += 2; }
      else { sco += 12; }
    }
    else if (pha < 7.6) {
      if (pco < 40) { sco += 3; }
      else { sco += 12; }
    }
    else {
      if (pco < 25) { sco += 0; }
      if (pco < 40) { sco += 3; }
      else { sco += 12; }
    }
  }

  if (nas == "") { alert("Input Na+"); }
  else {
    if (nas < 120) { sco += 3; }
    else if (nas < 135) { sco += 2; }
    else if (nas < 155) { sco += 0; }
    else { sco += 4; }
  }

  if (uri == "") { alert("Input Urine Output"); }
  else {
    if (uri < 400) { sco += 15; }
    else if (uri < 600) { sco += 8; }
    else if (uri < 900) { sco += 7; }
    else if (uri < 1500) { sco += 5; }
    else if (uri < 2000) { sco += 4; }
    else if (uri < 4000) { sco += 0; }
    else { sco += 1; }
  }
  document.apa.sco.value = sco;
  if (cre == "") { alert("Input Creatinine"); }
  else {
    if (hem == 1) {
      if ((uri < 410) && (cre >= 1.5)) { sco += 10; }
      else {
        if (cre < 0.5) { sco += 3; }
        else if (cre < 1.5) { sco += 0; }
        else if (cre < 1.95) { sco += 4; }
        else { sco += 7; }
      }
    }
    if (hem == 2) {
      if (cre < 0.5) { sco += 3; }
      else if (cre < 1.5) { sco += 0; }
      else if (cre < 1.95) { sco += 4; }
      else { sco += 7; }
    }
  }

  if (ure == "") { alert("Input Urea"); }
  else {
    if (ure < 17) { sco += 0; }
    else if (ure < 20) { sco += 2; }
    else if (ure < 40) { sco += 7; }
    else if (ure < 80) { sco += 11; }
    else { sco += 12; }
  }

  if (bsl == "") { alert("Input BSL"); }
  else {
    if (bsl < 40) { sco += 8; }
    else if (bsl < 60) { sco += 9; }
    else if (bsl < 200) { sco += 0; }
    else if (bsl < 350) { sco += 3; }
    else { sco += 5; }
  }

  if (alb == "") { alert("Input Albumin"); }
  else {
    if (alb < 20) { sco += 11; }
    else if (alb < 25) { sco += 6; }
    else if (alb < 45) { sco += 0; }
    else { sco += 4; }
  }

  if (bil == "") { alert("Input Bilirubin"); }
  else {
    if (bil < 2) { sco += 0; }
    else if (bil < 3) { sco += 5; }
    else if (bil < 5) { sco += 6; }
    else if (bil < 8) { sco += 8; }
    else { sco += 16; }
  }

  if (hto == "") { alert("Input Hematocrit"); }
  else {
    if (hto < 41) { sco += 3; }
    else if (hto < 50) { sco += 0; }
    else { sco += 3; }
  }

  if (wbc == "") { alert("Input WBC"); }
  else {
    if (wbc < 1) { sco += 19; }
    else if (wbc < 3) { sco += 5; }
    else if (wbc < 20) { sco += 0; }
    else if (wbc < 25) { sco += 1; }
    else { sco += 5; }
  }

  if (sed == "na") { sco += 0 }
  if (sed == "a") {
    if (gce == 1) {
      if (gcm == 6 || gcm == 5) {
        if (gcv == 5 || gcv == 4 || gcv == 3 || gcv == 2) { alert("Unlikely GCS combination"); }
        if (gcv == 1) { sco += 16 }
      }
      if (gcm == 4 || gcm == 3) {
        if (gcv == 5 || gcv == 4) { alert("Unlikely GCS combination"); }
        if (gcv == 3 || gcv == 2) { sco += 24 }
        if (gcv == 1) { sco += 33 }
      }
      if (gcm == 2 || gcm == 1) {
        if (gcv == 5 || gcv == 4) { alert("Unlikely GCS combination"); }
        if (gcv == 3 || gcv == 2) { sco += 29 }
        if (gcv == 1) { sco += 48 }
      }
    }

    if (gce != 1) {
      if (gcm == 6) {
        if (gcv == 5) { sco += 0 }
        if (gcv == 4) { sco += 3 }
        if (gcv == 3 || gcv == 2) { sco += 10 }
        if (gcv == 1) { sco += 15 }
      }
      if (gcm == 5) {
        if (gcv == 5) { sco += 3 }
        if (gcv == 4) { sco += 8 }
        if (gcv == 3 || gcv == 2) { sco += 13 }
        if (gcv == 1) { sco += 15 }
      }
      if (gcm == 4 || gcm == 3) {
        if (gcv == 5) { sco += 3 }
        if (gcv == 4) { sco += 13 }
        if (gcv == 3 || gcv == 2 || gcv == 1) { sco += 24 }
      }
      if (gcm == 2 || gcm == 1) {
        if (gcv == 5) { sco += 3 }
        if (gcv == 4) { sco += 13 }
        if (gcv == 3 || gcv == 2 || gcv == 1) { sco += 29 }
      }
    }
  }

  aps = sco;

  if (age == "") { alert("Input Age"); }
  else {
    if (age < 16) { alert("Not suitable for Pediatric Population"); }
    else if (age < 45) { sco += 0; }
    else if (age < 60) { sco += 5; }
    else if (age < 65) { sco += 11; }
    else if (age < 70) { sco += 13; }
    else if (age < 75) { sco += 16; }
    else if (age < 85) { sco += 17; }
    else { sco += 24; }
  }

  if (document.apa.aid.checked) { sco += 23 }
  else if (document.apa.hep.checked) { sco += 16 }
  else if (document.apa.lym.checked) { sco += 13 }
  else if (document.apa.met.checked) { sco += 11 }
  else if (document.apa.leu.checked) { sco += 10 }
  else if (document.apa.imm.checked) { sco += 10 }
  else if (document.apa.cir.checked) { sco += 4 }
  else { sco += 0 }

  x = -5.950471952;
  y = 1.673887925;

  if ((age - 27) > 0) { age1 = Math.pow((age - 27), 3) }
  if ((age - 51) > 0) { age2 = Math.pow((age - 51), 3) }
  if ((age - 64) > 0) { age3 = Math.pow((age - 64), 3) }
  if ((age - 74) > 0) { age4 = Math.pow((age - 74), 3) }
  if ((age - 86) > 0) { age5 = Math.pow((age - 86), 3) }

  if ((aps - 10) > 0) { aps1 = Math.pow((aps - 10), 3) }
  if ((aps - 22) > 0) { aps2 = Math.pow((aps - 22), 3) }
  if ((aps - 32) > 0) { aps3 = Math.pow((aps - 32), 3) }
  if ((aps - 48) > 0) { aps4 = Math.pow((aps - 48), 3) }
  if ((aps - 89) > 0) { aps5 = Math.pow((aps - 89), 3) }

  if (document.apa.los.value == "") { alert("Input Pre-ICU LOS"); }
  los = Math.sqrt(los);
  if ((los - 0.121) > 0) { los1 = Math.pow((los - 0.121), 3) }
  if ((los - 0.423) > 0) { los2 = Math.pow((los - 0.423), 3) }
  if ((los - 0.794) > 0) { los3 = Math.pow((los - 0.794), 3) }
  if ((los - 2.806) > 0) { los4 = Math.pow((los - 2.806), 3) }

  x += (age * 0.024177455);
  x += (age1 * (-0.00000438862));
  x += (age2 * 0.0000501422);
  x += (age3 * (-0.000127787));
  x += (age4 * 0.000109606);
  x += (age5 * (-0.0000275723));

  x += (aps * 0.055634916);
  x += (aps1 * 0.00000871852);
  x += (aps2 * (-0.0000451101));
  x += (aps3 * 0.00005038);
  x += (aps4 * (-0.0000131231));
  x += (aps5 * (-8.65349E-07));

  x += (los * -0.310487496);
  x += (los1 * 1.474672511);
  x += (los2 * -2.8618857);
  x += (los3 * 1.42165901);
  x += (los4 * -0.034445822);

  y += (age * 0.017603395);
  y += (age1 * (-7.68259E-06));
  y += (age2 * 3.95667E-05);
  y += (age3 * (-0.000166793));
  y += (age4 * 0.000228156);
  y += (age5 * (-9.32478E-05));

  y += (aps * 0.04442699);
  y += (aps1 * (-5.83049E-05));
  y += (aps2 * 0.000297008);
  y += (aps3 * (-0.000404434));
  y += (aps4 * 0.000189251);
  y += (aps5 * (-2.35199E-05));

  y += (los * 0.459823129);
  y += (los1 * 0.397791937);
  y += (los2 * (-0.945210953));
  y += (los3 * 0.588651266);
  y += (los4 * (-0.041232251));

  if (mod == "b") { x += 0.271760036; y += 1.835309541 }

  x += (oxy / (fio / 100)) * (-0.000397068);
  y += (oxy / (fio / 100)) * (-0.004581842);

  if (sed == "na") { x += 0.785764316; y += 1.789326613 }
  else { x += ((15 - gla) * 0.039117532); y += ((gla - 15) * 0.015182904) }

  if (document.apa.aid.checked) { x += 0.958100516; y += -0.10285942 }
  else if (document.apa.hep.checked) { x += 1.037379925; y += -0.16012995 }
  else if (document.apa.lym.checked) { x += 0.743471748; y += -0.28079854 }
  else if (document.apa.met.checked) { x += 1.086423752; y += -0.491932974 }
  else if (document.apa.leu.checked) { x += 0.969308299; y += -0.803754341 }
  else if (document.apa.imm.checked) { x += 0.435581083; y += -0.07438064 }
  else if (document.apa.cir.checked) { x += 0.814665088; y += 0.362658613 }

  if (ori == 1) { x += 0.017149193; y += 0.006529382 }
  if (ori == 2) { x += -0.583828121; y += -0.599591763 }
  if (ori == 3) { x += 0.022106266; y += 0.855505043 }

  if (eme == 1) { x += 0.249073458; y += 1.040690632 }

  if (rea == 1) { y += 0.540368459 }

  x += thr * (-0.579874039);
  y += thr * 0.062385214;

  if (c == "") { alert("Select Admission Diagnosis"); }
  else {
    if (c == 1) {
      x += 1 * v2meddia[s][d];
      y += 1 * vmeddia[s][d];
    }

    if (c == 2) {
      x += 1 * v2chidia[s][d];
      y += 1 * vchidia[s][d];
    }
  }

  var mor = Math.exp(x) / (1 + Math.exp(x));
  mor = mor * 100;
  mor = mor.toFixed(1);

  var sej = y.toFixed(1);

  document.apa.sco.value = sco;
  document.apa.aps.value = aps;
  document.apa.mor.value = mor;
  document.apa.sej.value = sej;
}

function MM_swapImgRestore() { //v3.0
  var i, x, a = document.MM_sr;
  for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
    x.src = x.oSrc;
  };
}

function MM_preloadImages() { //v3.0
  var d = document;
  if (d.images) {
    if (!d.MM_p) {
      d.MM_p = [];
    }
    var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
    for (i = 0; i < a.length; i++) {
      if (a[i].indexOf("#") != 0) {
        d.MM_p[j] = new Image;
        d.MM_p[j++].src = a[i];
      }
    }
  }
}

function MM_findObj(n, d) { //v4.01
  var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
    d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
  }
  if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
  for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
  if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i, j = 0, x, a = MM_swapImage.arguments;
  document.MM_sr = new Array;
  for (i = 0; i < (a.length - 2); i += 3) {
    if ((x = MM_findObj(a[i])) != null) {
      document.MM_sr[j++] = x;
      if (!x.oSrc) {
        x.oSrc = x.src;
      }
      x.src = a[i + 2];
    }
  }
}
