import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { FetchService } from 'src/app/services/fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class VisitLoaderService {
  private subscriptions: Subscription[] = [];
  private visit: any;
  private visitBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private fetchService: FetchService) {
    this.fetchService.initIoConnection();
  }

  get visitObservable(): Observable<any> {
    return this.visitBehaviorSubject.asObservable();
  }

  updateVisit(visitId: string): void {
    const visitNumber = Number(visitId);
    const fetchPromise = this.visit = this.fetchVisit(visitNumber);
    this.updateObservable();
    const subscription = fetchPromise.subscribe((visits: any[]) => {
      if (!visits.length) {
        return;
      }
      this.visit = visits[0];
      this.updateObservable();
      const admissionId = this.visit.hadm_id;
      /*
          proceduralTerminology: this.fetchProceduralTerminology(admissionId),
          diagnoses: this.fetchDiagnoses(admissionId),
          procedures: this.fetchProcedures(admissionId),
          mvProcedureEvents: this.fetchMvProcedureEvents(admissionId),
          labEvents: this.fetchLabEvents(admissionId),
          prescriptions: this.fetchPrescriptions(admissionId),
          outputs: this.fetchOutputs(admissionId),
          microbiology: this.fetchMicrobiology(admissionId),
          diagnosisRelatedGroup: this.fetchDiagnosisRelatedGroup(admissionId),
          mvInputEvents: this.fetchMvInputEvents(admissionId),
          cvInputEvents: this.fetchCvInputEvents(admissionId),
          chartEvents: this.fetchChartEvents(admissionId),
          notes: this.fetchNotes(admissionId),
        */
      this.addServices(admissionId);
    });
    this.subscriptions.push(subscription);
  }

  fetchVisit(visitId: number): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${visitId}`);
  }

  addServices(admissionId: string) {
    this.fetchServices(admissionId).subscribe((services) => {
      this.visit.services = services;
      this.updateObservable();
    });
  }

  fetchServices(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/services`);
  }
  private updateObservable() {
    this.visitBehaviorSubject.next(this.visit);
  }
}
