import { Component, OnInit } from '@angular/core';
import { Apache4Service } from 'src/app/services/apache-4-calculator/apache-4.service';
import { ApacheHealthInformation } from 'src/app/models/apache-health-information';
import { VerbalResponse } from 'src/app/models/verbal-response';
import { MotorResponse } from 'src/app/models/motor-response';
import { Origin } from 'src/app/models/origin';
import { AdmissionDiagnosis } from 'src/app/models/admission-diagnosis';
import { CrfHd } from 'src/app/models/crf-hd';
import { Sed } from 'src/app/services/apache-4-calculator/sed';
import { VentilationMode } from 'src/app/models/ventilation-mode';

const medsys: string[] = [
  'System', 'Cardiovascular', 'Respiratory', 'Digestive', 'Neurologic', 'Metabolic',
  'Hematologic', 'Genitourinary', 'Sepsis', 'Trauma', 'Miscellaneous'
];
const chisys = [
  'System', 'Cardiovascular', 'Respiratory', 'Digestive', 'Neurosurgery', 'Genitourinary',
  'Trauma', 'Miscellaneous'
];

const meddia = [
  ['Diagnosis'],
  [
    'Diagnosis', 'AMI Ant', 'AMI Inf/Lat', 'AMI Non-Q', 'AMI Other', 'Cardiac Arrest',
    'Cardiogenic Shock', 'Cardiomyopathy', 'Congestive HF', 'Chest Pain, rule out MI',
    'Hypertension', 'Hypovolemia', 'Hemorrhage', 'Aortic Aneuysm', 'Peripheral Vascular Disease',
    'Rythm Disturbance', 'Cardiac Drug Toxicity', 'Unstable Angina', 'Other'
  ], [
    'Diagnosis', 'Airway Obstruction', 'Asthma', 'Aspiration Pneumonia', 'Bacterial Pneumonia',
    'Viral Pneumonia', 'Parasitic/Fungal Pneumonia', 'COPD', 'Pleural Effusion',
    'Edema noncardiac', 'Embolism', 'Respiratory Arrest', 'Cancer (lung, ENT)',
    'Restrictive Disease', 'Other'
  ], [
    'Diagnosis', 'Upper Bleeding', 'Lower Bleeding', 'Variceal Bleeding', 'Inflammatory Disease',
    'Neoplasm', 'Obstruction', 'Perforation', 'Vascular Insufficiency', 'Hepatic Failure',
    'Intra/Retroperitoneal Bleeding', 'Pancreatitis', 'Other'
  ], [
    'Diagnosis', 'Intracerebral Hemorrhage', 'Neoplasm', 'Infection', 'Neuromuscular Disease',
    'Drug Overdose', 'Subdural/Epidural Hematoma', 'SAH, Aneurysm', 'Seizure', 'Stroke', 'Other'
  ], [
    'Diagnosis', 'Acid-base/Electrolyte Disorder', 'Diabetic Ketoacidosis',
    'Hyperosmolar Diabetic Coma', 'Other'
  ], [
    'Diagnosis', 'Coagulopathy, Neutro-/Thrombocyto-/Pancytopenia', 'Other'
  ], [
    'Diagnosis', 'Renal/Other'
  ], [
    'Diagnosis', 'Cutaneous', 'Gastrointestinal', 'Pulmonary', 'Urinary', 'Other', 'Unknown'
  ], [
    'Diagnosis', 'Head with Chest/Abdomen/Pelvis/Spine', 'Head with Face/Extremity', 'Head only',
    'Head with multi-trauma', 'Chest and Spine', 'Spine only', 'Multitrauma (no Head)'
  ], [
    'Diagnosis', 'General/Other'
  ],
];

const chidia = [
  [
    'Diagnosis'
  ], [
    'Diagnosis', 'Heart Valve', 'CABG with double/redo Valve', 'CABG with Single Valve',
    'Aortic Aneurysm, Elective', 'Aortic Aneurysm, Ruptured', 'Aortic Aneurysm, Dissection',
    'Femoro-popeliteal Bypass', 'Aorto-iliac/-femoral Bypass', 'Peripheral Ischemia',
    'Carotid', 'Other'
  ], [
    'Diagnosis', 'Thoracotomy (Malignancy)', 'ENT Neoplasm',
    'Thoracotomy (Lung biopy/Pleural Disease)', 'Thoracotomy (Infection)', 'Other'
  ], [
    'Diagnosis', 'Malignancy', 'Bleeding', 'Fistula/Abcess', 'Cholecystitis/Cholangitis',
    'GI Inflammation', 'Obstruction', 'Perforation', 'Ischemia', 'Liver Transplant', 'Other'
  ], [
    'Diagnosis', 'Neoplasm (Craniotomy/Transphenoidal)', 'Intracranial Hemorrhage',
    'SAH (Aneurysm/AVM)', 'Subdural/Epidural Hematoma', 'Spinal Cord Surgery', 'Other'
  ], [
    'Diagnosis', 'Neoplasm (Renal/Bladder/Prostate)', 'Renal Transplant', 'Hysterectomy', 'Other'
  ], [
    'Diagnosis', 'Head Only', 'Multitrauma with Head', 'Extremity', 'Multitrauma (no Head)'
  ], [
    'Diagnosis', 'Amputation (nontraumatic'
  ],
];

@Component({
  selector: 'app-apache-4-calculator',
  templateUrl: './apache-4-calculator.component.html',
  styleUrls: ['./apache-4-calculator.component.css']
})
export class Apache4CalculatorComponent implements ApacheHealthInformation, OnInit {
  public apa;
  public disp = 0;
  public visi;
  public vis;
  public ci = 0;
  public sho = 0;
  public admissionDiagnosisType;

  public age: number;
  public temperature: number;
  public map: number;
  public heartRate: number;
  public respirationRate: number;
  public fio: number;
  public oxy: number;
  public pco: number;
  public arterialPh: number;
  public nas: number;
  public urea: number;
  public creatine: number;
  public urine: number;
  public bsl: number;
  public albumin: number;
  public bilirubin: number;
  public hto: number;
  public wbc: number;
  public gcEyes: number;
  public gcVerbal: VerbalResponse;
  public gcMotor: MotorResponse;
  public respiratoryQuotient: number;
  public atmosphericPressure: number;
  public los: number;
  public origin: Origin;
  public admissionDiagnosis: AdmissionDiagnosis;
  public system: number;
  public diagnosis: number;
  public readmission: boolean;
  public emergencySurgery: boolean;
  public thrombolysis: number;
  public crfHd: CrfHd;
  public sed: Sed;
  public isAidChecked: boolean;
  public isHepChecked: boolean;
  public isLymChecked: boolean;
  public isMetChecked: boolean;
  public isLeuChecked: boolean;
  public isImmChecked: boolean;
  public isCirChecked: boolean;
  public ventilationMode: VentilationMode;

  constructor(private apache4Calculator: Apache4Service) { }

  ngOnInit(): void {
    this.apa = (document as any).apa;
    document.getElementById('tabthr').style.color = '#999999';
    document.getElementById('tabthr2').style.color = '#999999';
    this.apa.thr[0].disabled = true;
    this.apa.thr[1].disabled = true;
  }

  updateScore() {
    this.updateStateFromPage();
    const score = this.apache4Calculator.getApacheScore({
      age: this.age,
      temperature: this.temperature,
      map: this.map,
      heartRate: this.heartRate,
      respirationRate: this.respirationRate,
      fio: this.fio,
      oxy: this.oxy,
      pco: this.pco,
      arterialPh: this.arterialPh,
      nas: this.nas,
      urea: this.urea,
      creatine: this.creatine,
      urine: this.urine,
      bsl: this.bsl,
      albumin: this.albumin,
      bilirubin: this.bilirubin,
      hto: this.hto,
      wbc: this.wbc,
      gcEyes: this.gcEyes,
      gcVerbal: this.gcVerbal,
      gcMotor: this.gcMotor,
      respiratoryQuotient: this.respiratoryQuotient,
      atmosphericPressure: this.atmosphericPressure,
      los: this.los,
      origin: this.origin,
      admissionDiagnosis: this.admissionDiagnosis,
      system: this.system,
      diagnosis: this.diagnosis,
      readmission: this.readmission,
      emergencySurgery: this.emergencySurgery,
      thrombolysis: this.thrombolysis,
      crfHd: this.crfHd,
      sed: this.sed,
      isAidChecked: this.isAidChecked,
      isHepChecked: this.isHepChecked,
      isLymChecked: this.isLymChecked,
      isMetChecked: this.isMetChecked,
      isLeuChecked: this.isLeuChecked,
      isImmChecked: this.isImmChecked,
      isCirChecked: this.isCirChecked,
      ventilationMode: this.ventilationMode,
    });
    if (score.errorList.length) {
      score.errorList.forEach((error) => {
        alert(error);
      });
    } else {
      this.outputToPage(score);
    }
  }

  outputToPage(score) {
    const lengthOfStay = score.lengthOfStay.toFixed(1);
    this.apa.sco.value = score.score;
    this.apa.aps.value = score.apsScore;
    this.apa.mor.value = score.mortalityRate.toFixed(1);
    this.apa.sej.value = lengthOfStay;
  }

  updateStateFromPage() {
    this.age = Number(this.apa.age.value);
    this.temperature = Number(this.apa.tem.value);
    this.map = Number(this.apa.map.value);
    this.heartRate = Number(this.apa.hr.value);
    this.respirationRate = Number(this.apa.rr.value);
    this.fio = Number(this.apa.fio.value);
    this.oxy = Number(this.apa.oxy.value);
    this.pco = Number(this.apa.pco.value);
    this.arterialPh = Number(this.apa.pha.value);
    this.nas = Number(this.apa.nas.value);
    this.urea = Number(this.apa.ure.value);
    this.creatine = Number(this.apa.cre.value);
    this.urine = Number(this.apa.uri.value);
    this.bsl = Number(this.apa.bsl.value);
    this.albumin = Number(this.apa.alb.value);
    this.bilirubin = Number(this.apa.bil.value);
    this.hto = Number(this.apa.hto.value);
    this.wbc = Number(this.apa.wbc.value);
    this.gcEyes = Number(this.apa.gce.value);
    this.gcVerbal = Number(this.apa.gcv.value) as VerbalResponse;
    this.gcMotor = Number(this.apa.gcm.value) as MotorResponse;
    this.respiratoryQuotient = Number(this.apa.quo.value);
    this.atmosphericPressure = Number(this.apa.patm.value);
    this.los = Number(this.apa.los.value);
    this.origin = Number(this.apa.ori.value) as Origin;
    this.isAidChecked = this.apa.aid.checked;
    this.isHepChecked = this.apa.hep.checked;
    this.isLymChecked = this.apa.lym.checked;
    this.isMetChecked = this.apa.met.checked;
    this.isLeuChecked = this.apa.leu.checked;
    this.isImmChecked = this.apa.imm.checked;
    this.isCirChecked = this.apa.cir.checked;
    this.system = this.apa.sys.selectedIndex;
    this.diagnosis = this.apa.gno.selectedIndex;
    this.updateVentilationMode();
    this.updateAdmissionDiagnostic();
    this.updateRea();
    this.updateEme();
    this.updateThr();
    this.updateHem();
    this.updateSed();
  }

  updateVentilationMode() {
    const length = this.apa.ven.length;
    for (let i = 0; i < length; i++) {
      if (this.apa.ven[i].checked) {
        this.ventilationMode = this.apa.ven[i].value;
      }
    }
  }

  updateAdmissionDiagnostic() {
    const length = this.apa.typ.length;
    for (let i = 0; i < length; i++) {
      if (this.apa.typ[i].checked) {
        this.admissionDiagnosis = Number(this.apa.typ[i].value) as AdmissionDiagnosis;
      }
    }
  }

  updateRea() {
    if (this.apa.rea[0].checked) {
      this.readmission = false;
    } else {
      this.readmission = true;
    }
  }

  updateEme() {
    if (this.apa.eme[0].checked) {
      this.emergencySurgery = false;
    } else {
      this.emergencySurgery = true;
    }
  }

  updateThr() {
    if (this.apa.thr[0].checked) {
      this.thrombolysis = 0;
    }
    if (this.apa.thr[1].checked) {
      this.thrombolysis = 1;
    }
  }

  updateHem() {
    if (this.apa.crf.checked) {
      this.crfHd = 2;
    } else {
      this.crfHd = 1;
    }
  }

  updateSed() {
    if (this.apa.sed.checked === true) {
      this.sed = 'na';
    } else {
      this.sed = 'a';
    }
  }

  helpapp() {
    if (this.disp === 0) {
      document.getElementById('tl').style.display = 'block';
      this.disp = 1;
      this.visi = 'hidden';
    } else {
      document.getElementById('tl').style.display = 'none';
      this.disp = 0;
      this.visi = 'visible';
    }
    this.apa.gce.style.visibility = this.visi;
    this.apa.gcv.style.visibility = this.visi;
    this.apa.gcm.style.visibility = this.visi;
    this.apa.ori.style.visibility = this.visi;
    this.apa.sys.style.visibility = this.visi;
    this.apa.gno.style.visibility = this.visi;
  }

  gradapp() {
    if (this.sho === 0) {
      document.getElementById('grad').style.display = 'block';
      this.sho = 1;
      this.vis = 'hidden';
    } else {
      document.getElementById('grad').style.display = 'none';
      this.sho = 0;
      this.vis = 'visible';
    }

    this.apa.gce.style.visibility = this.vis;
    this.apa.gcv.style.visibility = this.vis;
    this.apa.gcm.style.visibility = this.vis;
  }

  defgcs() {
    if (this.apa.sed.checked) {
      document.getElementById('tabgla1').style.color = '#999999';
      document.getElementById('tabgla2').style.color = '#999999';
      document.getElementById('tabgla3').style.color = '#999999';
      this.apa.gce.disabled = true;
      this.apa.gcv.disabled = true;
      this.apa.gcm.disabled = true;
    } else {
      document.getElementById('tabgla1').style.color = '';
      document.getElementById('tabgla2').style.color = '';
      document.getElementById('tabgla3').style.color = '';
      this.apa.gce.disabled = false;
      this.apa.gcv.disabled = false;
      this.apa.gcm.disabled = false;
    }
  }

  defsys() {
    const l = this.apa.typ.length;

    for (let k = 0; k < l; k++) {
      if (this.apa.typ[k].checked) {
        this.admissionDiagnosisType = Number(this.apa.typ[k].value);
      }
    }

    let s = this.apa.sys.selectedIndex;

    const opts = this.apa.sys;
    const opts2 = this.apa.gno;
    const t = opts.length;
    const h = opts2.length;

    if (this.ci !== this.admissionDiagnosisType) {
      for (let u = 0; u < t; u++) { opts.remove(0); }
      for (let w = 0; w < h; w++) { opts2.remove(0); }

      if (this.admissionDiagnosisType === 1) {
        let z = medsys.length;
        for (let p = 0; p < z; p++) {
          const opt = new Option(medsys[p], p.toString());
          opts.add(opt, p);
          this.ci = 1;
        }
        if (s <= 4) {
          s += 0;
        }
        if (s === 5) {
          s = 7;
        }
        if (s === 6) {
          s = 9;
        }
        if (s === 7) {
          s = 10;
        }
        this.apa.sys.selectedIndex = s;
        z = meddia[s].length;
        for (let p = 0; p < z; p++) {
          const opt2 = new Option(meddia[s][p], p.toString());
          opts2.add(opt2, p);
        }
      }

      if (this.admissionDiagnosisType === 2) {
        let z = chisys.length;
        for (let p = 0; p < z; p++) {
          const opt = new Option(chisys[p], p.toString());
          opts.add(opt, p);
          this.ci = 2;
        }
        if (s <= 4) {
          s += 0;
        }
        if (s === 5 || s === 6 || s === 8) {
          s = 0;
        }
        if (s === 7) {
          s = 5;
        }
        if (s === 9) {
          s = 6;
        }
        if (s === 10) {
          s = 0;
        }
        this.apa.sys.selectedIndex = s;
        z = chidia[s].length;
        for (let p = 0; p < z; p++) {
          const opt2 = new Option(chidia[s][p], p.toString());
          opts2.add(opt2, p);
        }
      }
    }
  }

  defdiag() {
    const l = this.apa.typ.length;
    for (let k = 0; k < l; k++) {
      if (this.apa.typ[k].checked) {
        this.admissionDiagnosisType = Number(this.apa.typ[k].value);
      }
    }

    this.system = Number(this.apa.sys.selectedIndex);

    const opts = this.apa.gno;
    const t = opts.length;

    for (let u = 0; u < t; u++) {
      opts.remove(0);
    }

    if (this.admissionDiagnosisType === 1) {
      const z = meddia[this.system].length;
      for (let p = 0; p < z; p++) {
        const opt = new Option(meddia[this.system][p]);
        opts.add(opt, p);
      }
    }

    if (this.admissionDiagnosisType === 2) {
      const z = chidia[this.system].length;
      for (let p = 0; p < z; p++) {
        const opt = new Option(chidia[this.system][p]);
        opts.add(opt, p);
      }
    }
  }

  defthro() {
    let k;
    const l = this.apa.typ.length;
    for (k = 0; k < l; k++) {
      if (this.apa.typ[k].checked) {
        this.admissionDiagnosisType = Number(this.apa.typ[k].value);
      }
    }

    this.system = Number(this.apa.sys.selectedIndex);
    const diagnostic = Number(this.apa.gno.selectedIndex);

    if (this.admissionDiagnosisType === 1 && this.system === 1) {
      if (diagnostic === 1 || diagnostic === 2 || diagnostic === 3 || diagnostic === 4) {
        document.getElementById('tabthr').style.color = '';
        document.getElementById('tabthr2').style.color = '';
        this.apa.thr[0].disabled = false;
        this.apa.thr[1].disabled = false;
      } else {
        document.getElementById('tabthr').style.color = '#999999';
        document.getElementById('tabthr2').style.color = '#999999';
        this.apa.thr[0].checked = true;
        this.apa.thr[0].disabled = true;
        this.apa.thr[1].disabled = true;
      }
    } else {
      document.getElementById('tabthr').style.color = '#999999';
      document.getElementById('tabthr2').style.color = '#999999';
      this.apa.thr[0].checked = true;
      this.apa.thr[0].disabled = true;
      this.apa.thr[1].disabled = true;
    }
  }

  MM_swapImgRestore() { // v3.0
    const a = (document as any).MM_sr;
    for (let i = 0; a && i < a.length; i++) {
      const x = a[i];
      if (x.oSrc) {
        x.src = x.oSrc;
      }
    }
  }

  MM_findObj(n, d?: any) { // v4.01
    let i;

    if (!d) {
      d = document;
    }

    const p = n.indexOf('?');
    if (p > 0 && parent.frames.length) {
      d = parent.frames[n.substring(p + 1)].document;
      n = n.substring(0, p);
    }

    let x = d[n];
    if (!x && d.all) {
      x = d.all[n];
    }
    for (i = 0; !x && i < d.forms.length; i++) {
      x = d.forms[i][n];
    }
    for (i = 0; !x && d.layers && i < d.layers.length; i++) {
      x = this.MM_findObj(n, d.layers[i].document);
    }
    if (!x && d.getElementById) {
      x = d.getElementById(n);
    }
    return x;
  }

  MM_swapImage() { // v3.0
    let i;
    let j = 0;
    let x;
    const a = this.MM_swapImage.arguments;
    (document as any).MM_sr = [];
    for (i = 0; i < (a.length - 2); i += 3) {
      x = this.MM_findObj(a[i]);
      if (x !== null) {
        (document as any).MM_sr[j++] = x;
        if (!x.oSrc) {
          x.oSrc = x.src;
        }
        x.src = a[i + 2];
      }
    }
  }
}
