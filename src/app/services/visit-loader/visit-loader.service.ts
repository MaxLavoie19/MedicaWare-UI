import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import { FetchService } from 'src/app/services/fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class VisitLoaderService {
  private subscriptions: Subscription[] = [];

  constructor(private fetchService: FetchService) {
    this.fetchService.initIoConnection();
  }

  getVisit(visitId: string): Observable<any> {
    const visitNumber = Number(visitId);
    const visitBehaviorSubject = new BehaviorSubject({ visitId });

    const fetchPromise = this.fetchVisit(visitNumber);
    const subscription = fetchPromise.subscribe((visits: any[]) => {
      if (!visits.length) {
        return;
      }
      const visit = visits[0];
      const admissionId = visit.hadm_id;
      visit.services = this.fetchServices(admissionId);
      visit.proceduralTerminology = this.fetchProceduralTerminology(admissionId);
      visit.diagnostics = this.fetchDiagnostics(admissionId);
      visit.procedureGroups = this.fetchProcedureGroups(admissionId);
      visit.labEvents = this.fetchLabEvents(admissionId);
      visit.mvProcedureEventGroups = this.fetchMvProcedureEventGroups(admissionId);
      visit.prescriptionGroups = this.fetchPrescriptionGroups(admissionId);
      visit.outputGroups = this.fetchOutputGroups(admissionId);
      visit.microbiology = this.fetchMicrobiology(admissionId);
      visit.diagnosisRelatedGroup = this.fetchDiagnosisRelatedGroup(admissionId);
      visit.mvInputEventGroups = this.fetchMvInputEventGroups(admissionId);
      visit.cvInputEventGroups = this.fetchCvInputEventGroups(admissionId);
      visit.chartEventTypes = this.getChartEventTypes(admissionId);
      visit.notes = this.fetchNotes(admissionId);
      visitBehaviorSubject.next(visit);
      this.setVisitCompleteCondition(visitBehaviorSubject);
    });
    this.subscriptions.push(subscription);
    return visitBehaviorSubject.asObservable();
  }

  getChartEventTypes(admissionId: string) {
    const chartEventTypesSubject = new Subject();
    const fetchObservable = this.fetchChartEventTypes(admissionId);
    const chartSubscription = fetchObservable.subscribe((chartEventTypeList: []) => {
      const chartEventTypes = {};
      const chartEventTypeObservableList = [];
      chartEventTypeList.forEach((chartEventType: any) => {
        const chartEventTypeName = chartEventType.label;
        const itemId = chartEventType.itemid;
        const observable = this.fetchChartEventsByType(admissionId, itemId);
        chartEventTypes[chartEventTypeName] = observable;
        chartEventTypeObservableList.push(observable);
      });
      forkJoin(chartEventTypeObservableList).subscribe(() => {
        chartEventTypesSubject.complete();
      });
      chartEventTypesSubject.next(chartEventTypes);
    });
    this.subscriptions.push(chartSubscription);
    return chartEventTypesSubject.asObservable();
  }

  setVisitCompleteCondition(visitBehaviorSubject) {
    const visit = visitBehaviorSubject.value;
    const observableList = Object.keys(visit).reduce((observables: Observable<any>[], key: string) => {
      const member = visit[key];
      if (member instanceof Observable) {
        observables.push(member);
      }
      return observables;
    }, []);
    forkJoin(observableList).subscribe(() => {
      visitBehaviorSubject.complete();
    });
  }

  fetchVisit(visitId: number): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${visitId}`);
  }

  fetchServices(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/services`);
  }

  fetchProceduralTerminology(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/procedural-terminologies`);
  }

  fetchDiagnostics(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/diagnostics`);
  }

  fetchProcedures(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/procedures`);
  }

  fetchProcedureGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/procedure-groups`);
  }

  fetchMvProcedureEvents(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/mv-procedure-events`);
  }

  fetchMvProcedureEventGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/mv-procedure-event-groups`);
  }

  fetchLabEvents(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/lab-events`);
  }

  fetchPrescriptions(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/prescriptions`);
  }

  fetchPrescriptionGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/prescription-groups`);
  }

  fetchOutputs(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/outputs`);
  }

  fetchOutputGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/output-groups`);
  }

  fetchMicrobiology(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/microbiology-events`);
  }

  fetchDiagnosisRelatedGroup(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/diagnosis-related-groups`);
  }

  fetchMvInputEvents(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/mv-input-events`);
  }

  fetchMvInputEventGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/mv-input-event-groups`);
  }

  fetchCvInputEvents(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/cv-input-events`);
  }

  fetchCvInputEventGroups(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/cv-input-event-groups`);
  }

  fetchChartEvents(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/chart-events`);
  }

  fetchChartEventTypes(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/chart-event-types`);
  }

  fetchChartEventsByType(admissionId: string, itemId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/chart-events/item-id/${itemId}`);
  }

  fetchNotes(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/notes`);
  }
}
