import vmeddia from './vmeddia.json';
import v2meddia from './v2meddia.json';
import vchidia from './vchidia.json';
import v2chidia from './v2chidia.json';
import { Score } from 'src/app/models/score.js';
import { ApacheHealthInformation } from 'src/app/models/apache-health-information.js';

export class ApacheScoreCalculator implements ApacheHealthInformation {
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
  public gcVerbal: 1 | 2 | 3 | 4 | 5;
  public gcMotor: 1 | 2 | 3 | 4 | 5 | 6;
  public respiratoryQuotient: number;
  public atmosphericPressure: number;
  public los: number;
  public origin: 1 | 2 | 3;
  public admissionDiagnosis: 1 | 2;
  public system;
  public diagnosis;
  public readmission: boolean;
  public emergencySurgery: boolean;
  public thrombolysis;
  public crfHd;
  public sed: 'na' | 'a';
  public isAidChecked: boolean;
  public isHepChecked: boolean;
  public isLymChecked: boolean;
  public isMetChecked: boolean;
  public isLeuChecked: boolean;
  public isImmChecked: boolean;
  public isCirChecked: boolean;
  public ventilationMode: 'a' | 'b';

  public score;
  public apsScore;
  public mortalityRate;
  public aad;
  public gla;
  public errorList;

  private x;
  private lengthOfStay;

  private age1 = 0;
  private age2 = 0;
  private age3 = 0;
  private age4 = 0;
  private age5 = 0;

  private aps1 = 0;
  private aps2 = 0;
  private aps3 = 0;
  private aps4 = 0;
  private aps5 = 0;

  private los1 = 0;
  private los2 = 0;
  private los3 = 0;
  private los4 = 0;

  getScore(): Score {
    this.validate();
    const score: any = {};
    if (!this.errorList.length) {
      this.aad = (this.fio / 100) * (this.atmosphericPressure - 47) - (this.pco / this.respiratoryQuotient) - this.oxy;
      this.gla = this.gcEyes + this.gcVerbal + this.gcMotor;
      this.score = 0;
      this.x = -5.950471952;
      this.lengthOfStay = 1.673887925;
      this.addTemperatureScore();
      this.addMapScore();
      this.addHeartRateScore();
      this.addRespirationRateScore();
      this.addVentilationScore();
      this.addPhaAndPcoScore();
      this.addNasScore();
      this.addUriScore();
      this.addHemScore();
      this.addUreScore();
      this.addBslScore();
      this.addAlbScore();
      this.addBilScore();
      this.addHtoScore();
      this.addWbcScore();
      this.addSedGceGcmGcvScore();
      this.apsScore = this.score;
      this.addAgeScore();
      this.addChronicHealthConditionScore();
      this.setAgeModifiers();
      this.setApsModifiers();
      this.setLosModifiers();
      this.updateXAndY();
      this.mortalityRate = Math.exp(this.x) / (1 + Math.exp(this.x));
      this.mortalityRate = this.mortalityRate * 100;
      score.lengthOfStay = this.lengthOfStay;
      score.mortalityRate = this.mortalityRate;
      score.apsScore = this.apsScore;
      score.score = this.score;
    }
    score.errorList = this.errorList;
    return score;
  }

  validate() {
    this.errorList = [];
    if (this.temperature === undefined) {
      this.errorList.push('Input Temperature');
    }
    if (this.map === undefined) {
      this.errorList.push('Input MAP');
    }
    if (this.heartRate === undefined) {
      this.errorList.push('Input HR');
    }
    if (this.respirationRate === undefined) {
      this.errorList.push('Input RR');
    }
    if (this.ventilationMode === undefined) {
      this.errorList.push('Select Ventilation Mode');
    }
    if (this.fio === undefined) {
      this.errorList.push('Input FiO2');
    }
    if (this.oxy === undefined) {
      this.errorList.push('Input pO2');
    }
    if (this.pco === undefined) {
      this.errorList.push('Input pCO2');
    }
    if (this.arterialPh === undefined) {
      this.errorList.push('Input pH');
    }
    if (this.nas === undefined) {
      this.errorList.push('Input Na+');
    }
    if (this.urine === undefined) {
      this.errorList.push('Input Urine Output');
    }
    if (this.creatine === undefined) {
      this.errorList.push('Input Creatinine');
    }
    if (this.urea === undefined) {
      this.errorList.push('Input Urea');
    }
    if (this.bsl === undefined) {
      this.errorList.push('Input BSL');
    }
    if (this.albumin === undefined) {
      this.errorList.push('Input Albumin');
    }
    if (this.bilirubin === undefined) {
      this.errorList.push('Input Bilirubin');
    }
    if (this.hto === undefined) {
      this.errorList.push('Input Hematocrit');
    }
    if (this.wbc === undefined) {
      this.errorList.push('Input WBC');
    }
    if (this.age === undefined) {
      this.errorList.push('Input Age');
    }
    if (this.age < 16) {
      this.errorList.push('Not suitable for Pediatric Population');
    }
    if (this.admissionDiagnosis === undefined) {
      this.errorList.push('Select Admission Diagnosis');
    }
    if (this.los === undefined) {
      this.errorList.push('Input Pre-ICU LOS');
    }
  }

  addTemperatureScore() {
    if (this.temperature < 33) {
      this.score += 20;
    } else if (this.temperature < 33.5) {
      this.score += 16;
    } else if (this.temperature < 34) {
      this.score += 13;
    } else if (this.temperature < 35) {
      this.score += 8;
    } else if (this.temperature < 36) {
      this.score += 2;
    } else if (this.temperature < 40) {
      this.score += 0;
    } else {
      this.score += 4;
    }
  }

  addMapScore() {
    if (this.map <= 39) {
      this.score += 23;
    } else if (this.map < 60) {
      this.score += 15;
    } else if (this.map < 70) {
      this.score += 7;
    } else if (this.map < 80) {
      this.score += 6;
    } else if (this.map < 100) {
      this.score += 0;
    } else if (this.map < 120) {
      this.score += 4;
    } else if (this.map < 130) {
      this.score += 7;
    } else if (this.map < 140) {
      this.score += 9;
    } else {
      this.score += 10;
    }
  }

  addHeartRateScore() {
    if (this.heartRate < 40) {
      this.score += 8;
    } else if (this.heartRate < 50) {
      this.score += 5;
    } else if (this.heartRate < 100) {
      this.score += 0;
    } else if (this.heartRate < 110) {
      this.score += 1;
    } else if (this.heartRate < 120) {
      this.score += 5;
    } else if (this.heartRate < 140) {
      this.score += 7;
    } else if (this.heartRate < 155) {
      this.score += 13;
    } else {
      this.score += 17;
    }
  }

  addRespirationRateScore() {
    if (this.respirationRate <= 5) {
      this.score += 17;
    } else if (this.respirationRate < 12) {
      this.score += 8;
    } else if (this.respirationRate < 14) {
      this.score += 7;
    } else if (this.respirationRate < 25) {
      this.score += 0;
    } else if (this.respirationRate < 35) {
      this.score += 6;
    } else if (this.respirationRate < 40) {
      this.score += 9;
    } else if (this.respirationRate < 50) {
      this.score += 11;
    } else {
      this.score += 18;
    }
  }

  addVentilationScore() {
    if (this.ventilationMode === 'a') {
      if (this.oxy < 50) {
        this.score += 15;
      } else if (this.oxy < 70) {
        this.score += 5;
      } else if (this.oxy < 80) {
        this.score += 2;
      } else {
        this.score += 0;
      }
    }
    if (this.ventilationMode === 'b') {
      if (this.fio >= 50) {
        if (this.aad < 100) {
          this.score += 0;
        } else if (this.aad < 250) {
          this.score += 7;
        } else if (this.aad < 350) {
          this.score += 9;
        } else if (this.aad < 500) {
          this.score += 11;
        } else {
          this.score += 14;
        }
      }
      if (this.fio < 50) {
        if (this.oxy < 50) {
          this.score += 15;
        } else if (this.oxy < 70) {
          this.score += 5;
        } else if (this.oxy < 80) {
          this.score += 2;
        } else {
          this.score += 0;
        }
      }
    }
  }

  addPhaAndPcoScore() {
    if (this.arterialPh < 7.2) {
      if (this.pco < 50) {
        this.score += 12;
      } else {
        this.score += 4;
      }
    } else if (this.arterialPh < 7.3) {
      if (this.pco < 30) {
        this.score += 9;
      } else if (this.pco < 40) {
        this.score += 6;
      } else if (this.pco < 50) {
        this.score += 3;
      } else {
        this.score += 2;
      }
    } else if (this.arterialPh < 7.35) {
      if (this.pco < 30) {
        this.score += 9;
      } else if (this.pco < 45) {
        this.score += 0;
      } else {
        this.score += 1;
      }
    } else if (this.arterialPh < 7.45) {
      if (this.pco < 30) {
        this.score += 5;
      } else if (this.pco < 45) {
        this.score += 0;
      } else {
        this.score += 1;
      }
    } else if (this.arterialPh < 7.5) {
      if (this.pco < 30) {
        this.score += 5;
      } else if (this.pco < 35) {
        this.score += 0;
      } else if (this.pco < 45) {
        this.score += 2;
      } else {
        this.score += 12;
      }
    } else if (this.arterialPh < 7.6) {
      if (this.pco < 40) {
        this.score += 3;
      } else {
        this.score += 12;
      }
    } else {
      if (this.pco < 25) {
        this.score += 0;
      }
      if (this.pco < 40) {
        this.score += 3;
      } else {
        this.score += 12;
      }
    }
  }

  addNasScore() {
    if (this.nas < 120) {
      this.score += 3;
    } else if (this.nas < 135) {
      this.score += 2;
    } else if (this.nas < 155) {
      this.score += 0;
    } else {
      this.score += 4;
    }
  }

  addUriScore() {
    if (this.urine < 400) {
      this.score += 15;
    } else if (this.urine < 600) {
      this.score += 8;
    } else if (this.urine < 900) {
      this.score += 7;
    } else if (this.urine < 1500) {
      this.score += 5;
    } else if (this.urine < 2000) {
      this.score += 4;
    } else if (this.urine < 4000) {
      this.score += 0;
    } else { this.score += 1; }
  }

  addHemScore() {
    if (this.crfHd === 1) {
      if ((this.urine < 410) && (this.creatine >= 1.5)) {
        this.score += 10;
      } else {
        if (this.creatine < 0.5) {
          this.score += 3;
        } else if (this.creatine < 1.5) {
          this.score += 0;
        } else if (this.creatine < 1.95) {
          this.score += 4;
        } else {
          this.score += 7;
        }
      }
    } else if (this.crfHd === 2) {
      if (this.creatine < 0.5) {
        this.score += 3;
      } else if (this.creatine < 1.5) {
        this.score += 0;
      } else if (this.creatine < 1.95) {
        this.score += 4;
      } else {
        this.score += 7;
      }
    }
  }

  addUreScore() {
    if (this.urea < 17) {
      this.score += 0;
    } else if (this.urea < 20) {
      this.score += 2;
    } else if (this.urea < 40) {
      this.score += 7;
    } else if (this.urea < 80) {
      this.score += 11;
    } else {
      this.score += 12;
    }
  }

  addBslScore() {
    if (this.bsl < 40) {
      this.score += 8;
    } else if (this.bsl < 60) {
      this.score += 9;
    } else if (this.bsl < 200) {
      this.score += 0;
    } else if (this.bsl < 350) {
      this.score += 3;
    } else {
      this.score += 5;
    }
  }

  addAlbScore() {
    if (this.albumin < 20) {
      this.score += 11;
    } else if (this.albumin < 25) {
      this.score += 6;
    } else if (this.albumin < 45) {
      this.score += 0;
    } else {
      this.score += 4;
    }
  }

  addBilScore() {
    if (this.bilirubin < 2) {
      this.score += 0;
    } else if (this.bilirubin < 3) {
      this.score += 5;
    } else if (this.bilirubin < 5) {
      this.score += 6;
    } else if (this.bilirubin < 8) {
      this.score += 8;
    } else {
      this.score += 16;
    }
  }

  addHtoScore() {
    if (this.hto < 41) {
      this.score += 3;
    } else if (this.hto < 50) {
      this.score += 0;
    } else {
      this.score += 3;
    }
  }

  addWbcScore() {
    if (this.wbc < 1) {
      this.score += 19;
    } else if (this.wbc < 3) {
      this.score += 5;
    } else if (this.wbc < 20) {
      this.score += 0;
    } else if (this.wbc < 25) {
      this.score += 1;
    } else {
      this.score += 5;
    }
  }

  addSedGceGcmGcvScore() {
    if (this.sed === 'na') {
      this.score += 0;
    } else if (this.sed === 'a') {
      if (this.gcEyes === 1) {
        if (this.gcMotor === 6 || this.gcMotor === 5) {
          if (this.gcVerbal === 5 || this.gcVerbal === 4 || this.gcVerbal === 3 || this.gcVerbal === 2) {
            alert('Unlikely GCS combination');
          }
          if (this.gcVerbal === 1) {
            this.score += 16;
          }
        }
        if (this.gcMotor === 4 || this.gcMotor === 3) {
          if (this.gcVerbal === 5 || this.gcVerbal === 4) { alert('Unlikely GCS combination'); }
          if (this.gcVerbal === 3 || this.gcVerbal === 2) {
            this.score += 24;
          }
          if (this.gcVerbal === 1) {
            this.score += 33;
          }
        }
        if (this.gcMotor === 2 || this.gcMotor === 1) {
          if (this.gcVerbal === 5 || this.gcVerbal === 4) { alert('Unlikely GCS combination'); }
          if (this.gcVerbal === 3 || this.gcVerbal === 2) { this.score += 29; }
          if (this.gcVerbal === 1) { this.score += 48; }
        }
      } else {
        if (this.gcMotor === 6) {
          if (this.gcVerbal === 5) {
            this.score += 0;
          }
          if (this.gcVerbal === 4) {
            this.score += 3;
          }
          if (this.gcVerbal === 3 || this.gcVerbal === 2) {
            this.score += 10;
          }
          if (this.gcVerbal === 1) {
            this.score += 15;
          }
        }
        if (this.gcMotor === 5) {
          if (this.gcVerbal === 5) { this.score += 3; }
          if (this.gcVerbal === 4) { this.score += 8; }
          if (this.gcVerbal === 3 || this.gcVerbal === 2) { this.score += 13; }
          if (this.gcVerbal === 1) { this.score += 15; }
        }
        if (this.gcMotor === 4 || this.gcMotor === 3) {
          if (this.gcVerbal === 5) {
            this.score += 3;
          }
          if (this.gcVerbal === 4) {
            this.score += 13;
          }
          if (this.gcVerbal === 3 || this.gcVerbal === 2 || this.gcVerbal === 1) {
            this.score += 24;
          }
        }
        if (this.gcMotor === 2 || this.gcMotor === 1) {
          if (this.gcVerbal === 5) {
            this.score += 3;
          }
          if (this.gcVerbal === 4) {
            this.score += 13;
          }
          if (this.gcVerbal === 3 || this.gcVerbal === 2 || this.gcVerbal === 1) {
            this.score += 29;
          }
        }
      }
    }
  }

  addAgeScore() {
    if (this.age < 45) {
      this.score += 0;
    } else if (this.age < 60) {
      this.score += 5;
    } else if (this.age < 65) {
      this.score += 11;
    } else if (this.age < 70) {
      this.score += 13;
    } else if (this.age < 75) {
      this.score += 16;
    } else if (this.age < 85) {
      this.score += 17;
    } else {
      this.score += 24;
    }
  }

  addChronicHealthConditionScore() {
    if (this.isAidChecked) {
      this.score += 23;
    } else if (this.isHepChecked) {
      this.score += 16;
    } else if (this.isLymChecked) {
      this.score += 13;
    } else if (this.isMetChecked) {
      this.score += 11;
    } else if (this.isLeuChecked) {
      this.score += 10;
    } else if (this.isImmChecked) {
      this.score += 10;
    } else if (this.isCirChecked) {
      this.score += 4;
    }
  }

  setAgeModifiers() {
    if ((this.age - 27) > 0) {
      this.age1 = Math.pow((this.age - 27), 3);
    } else {
      this.age1 = 0;
    }
    if ((this.age - 51) > 0) {
      this.age2 = Math.pow((this.age - 51), 3);
    } else {
      this.age2 = 0;
    }
    if ((this.age - 64) > 0) {
      this.age3 = Math.pow((this.age - 64), 3);
    } else {
      this.age3 = 0;
    }
    if ((this.age - 74) > 0) {
      this.age4 = Math.pow((this.age - 74), 3);
    } else {
      this.age4 = 0;
    }
    if ((this.age - 86) > 0) {
      this.age5 = Math.pow((this.age - 86), 3);
    } else {
      this.age5 = 0;
    }
  }

  setApsModifiers() {
    if ((this.apsScore - 10) > 0) {
      this.aps1 = Math.pow((this.apsScore - 10), 3);
    } else {
      this.aps1 = 0;
    }
    if ((this.apsScore - 22) > 0) {
      this.aps2 = Math.pow((this.apsScore - 22), 3);
    } else {
      this.aps2 = 0;
    }
    if ((this.apsScore - 32) > 0) {
      this.aps3 = Math.pow((this.apsScore - 32), 3);
    } else {
      this.aps3 = 0;
    }
    if ((this.apsScore - 48) > 0) {
      this.aps4 = Math.pow((this.apsScore - 48), 3);
    } else {
      this.aps4 = 0;
    }
    if ((this.apsScore - 89) > 0) {
      this.aps5 = Math.pow((this.apsScore - 89), 3);
    } else {
      this.aps5 = 0;
    }
  }

  setLosModifiers() {
    this.los = Math.sqrt(this.los);
    if ((this.los - 0.121) > 0) {
      this.los1 = Math.pow((this.los - 0.121), 3);
    } else {
      this.los1 = 0;
    }
    if ((this.los - 0.423) > 0) {
      this.los2 = Math.pow((this.los - 0.423), 3);
    } else {
      this.los2 = 0;
    }
    if ((this.los - 0.794) > 0) {
      this.los3 = Math.pow((this.los - 0.794), 3);
    } else {
      this.los3 = 0;
    }
    if ((this.los - 2.806) > 0) {
      this.los4 = Math.pow((this.los - 2.806), 3);
    } else {
      this.los4 = 0;
    }
  }

  updateX() {
    this.x += (this.age * 0.024177455);
    this.x += (this.age1 * (-0.00000438862));
    this.x += (this.age2 * 0.0000501422);
    this.x += (this.age3 * (-0.000127787));
    this.x += (this.age4 * 0.000109606);
    this.x += (this.age5 * (-0.0000275723));

    this.x += (this.apsScore * 0.055634916);
    this.x += (this.aps1 * 0.00000871852);
    this.x += (this.aps2 * (-0.0000451101));
    this.x += (this.aps3 * 0.00005038);
    this.x += (this.aps4 * (-0.0000131231));
    this.x += (this.aps5 * (-8.65349E-07));

    this.x += (this.los * -0.310487496);
    this.x += (this.los1 * 1.474672511);
    this.x += (this.los2 * -2.8618857);
    this.x += (this.los3 * 1.42165901);
    this.x += (this.los4 * -0.034445822);
  }

  updateY() {
    this.lengthOfStay += (this.age * 0.017603395);
    this.lengthOfStay += (this.age1 * (-7.68259E-06));
    this.lengthOfStay += (this.age2 * 3.95667E-05);
    this.lengthOfStay += (this.age3 * (-0.000166793));
    this.lengthOfStay += (this.age4 * 0.000228156);
    this.lengthOfStay += (this.age5 * (-9.32478E-05));

    this.lengthOfStay += (this.apsScore * 0.04442699);
    this.lengthOfStay += (this.aps1 * (-5.83049E-05));
    this.lengthOfStay += (this.aps2 * 0.000297008);
    this.lengthOfStay += (this.aps3 * (-0.000404434));
    this.lengthOfStay += (this.aps4 * 0.000189251);
    this.lengthOfStay += (this.aps5 * (-2.35199E-05));

    this.lengthOfStay += (this.los * 0.459823129);
    this.lengthOfStay += (this.los1 * 0.397791937);
    this.lengthOfStay += (this.los2 * (-0.945210953));
    this.lengthOfStay += (this.los3 * 0.588651266);
    this.lengthOfStay += (this.los4 * (-0.041232251));
  }
  updateXAndY() {
    this.updateX();
    this.updateY();
    if (this.ventilationMode === 'b') {
      this.x += 0.271760036;
      this.lengthOfStay += 1.835309541;
    }

    this.x += (this.oxy / (this.fio / 100)) * (-0.000397068);
    this.lengthOfStay += (this.oxy / (this.fio / 100)) * (-0.004581842);

    if (this.sed === 'na') {
      this.x += 0.785764316;
      this.lengthOfStay += 1.789326613;
    } else {
      this.x += ((15 - this.gla) * 0.039117532);
      this.lengthOfStay += ((this.gla - 15) * 0.015182904);
    }

    if (this.isAidChecked) {
      this.x += 0.958100516; this.lengthOfStay += -0.10285942;
    } else if (this.isHepChecked) {
      this.x += 1.037379925; this.lengthOfStay += -0.16012995;
    } else if (this.isLymChecked) {
      this.x += 0.743471748; this.lengthOfStay += -0.28079854;
    } else if (this.isMetChecked) {
      this.x += 1.086423752; this.lengthOfStay += -0.491932974;
    } else if (this.isLeuChecked) {
      this.x += 0.969308299; this.lengthOfStay += -0.803754341;
    } else if (this.isImmChecked) {
      this.x += 0.435581083; this.lengthOfStay += -0.07438064;
    } else if (this.isCirChecked) {
      this.x += 0.814665088; this.lengthOfStay += 0.362658613;
    }

    if (this.origin === 1) {
      this.x += 0.017149193;
      this.lengthOfStay += 0.006529382;
    }

    if (this.origin === 2) {
      this.x += -0.583828121;
      this.lengthOfStay += -0.599591763;
    }
    if (this.origin === 3) {
      this.x += 0.022106266;
      this.lengthOfStay += 0.855505043;
    }

    if (this.emergencySurgery) {
      this.x += 0.249073458;
      this.lengthOfStay += 1.040690632;
    }

    if (this.readmission) {
      this.lengthOfStay += 0.540368459;
    }

    this.x += this.thrombolysis * (-0.579874039);
    this.lengthOfStay += this.thrombolysis * 0.062385214;

    if (this.admissionDiagnosis === 1) {
      this.x += v2meddia[this.system][this.diagnosis];
      this.lengthOfStay += 1 * vmeddia[this.system][this.diagnosis];
    }

    if (this.admissionDiagnosis === 2) {
      this.x += 1 * v2chidia[this.system][this.diagnosis];
      this.lengthOfStay += 1 * vchidia[this.system][this.diagnosis];
    }
  }
}
