import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import { FetchService } from 'src/app/services/fetch/fetch.service';
import { map } from 'rxjs/operators';

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
      visit.chartDiscreteEventTypes = this.fetchChartEvents(admissionId, 'discrete');
      visit.chartLinearEventTypes = this.fetchChartEvents(admissionId, 'linear', true);
      visit.notes = this.fetchNotes(admissionId);
      visitBehaviorSubject.next(visit);
      this.setVisitCompleteCondition(visitBehaviorSubject);
    });
    this.subscriptions.push(subscription);
    return visitBehaviorSubject.asObservable();
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

  fetchChartEvents(admissionId: string, dataType?: string, isOnlyLimit?: boolean): Observable<unknown> {
    let onlyLimit;
    if (isOnlyLimit !== undefined) {
      onlyLimit = isOnlyLimit.toString();
    } else {
      onlyLimit = '';
    }
    return this.fetchService.fetch(
      `http://localhost:4040/visit/${admissionId}/chart-events`,
      { params: { dataType, onlyLimit } }
    ).pipe(map((chartEventList): any => {
      const chartEventDict = {};
      chartEventList.forEach((chartEvent: any) => {
        const label = chartEvent.label;
        if (dataType === 'linear') {
          const oldEvent = chartEventDict[label];
          chartEventDict[label] = this.mergeLinearChartEvent(oldEvent, chartEvent);
        } else {
          chartEventDict[label] = chartEvent;
        }
      });
      return chartEventDict;
    }));
  }

  mergeLinearChartEvent(oldEvent, newChartEvent) {
    newChartEvent.valuenum = Number(newChartEvent.valuenum);
    newChartEvent.charttime = new Date(newChartEvent.charttime);
    if (oldEvent) {
      if (oldEvent.maxValuenum < newChartEvent.valuenum) {
        oldEvent.maxValuenum = newChartEvent.valuenum;
        oldEvent.maxValueuom = newChartEvent.valueuom;
        oldEvent.maxCharttime = newChartEvent.charttime;
      } else {
        oldEvent.minValuenum = newChartEvent.valuenum;
        oldEvent.minValueuom = newChartEvent.valueuom;
        oldEvent.minCharttime = newChartEvent.charttime;
      }
      if (oldEvent.minValueuom === oldEvent.maxValueuom) {
        oldEvent.deltaValuenum = oldEvent.maxValuenum - oldEvent.minValuenum;
      }
      oldEvent.deltaCharttime = oldEvent.maxCharttime - oldEvent.minCharttime;
    } else {
      oldEvent = {
        minValuenum: newChartEvent.valuenum, maxValuenum: newChartEvent.valuenum,
        minValueuom: newChartEvent.valueuom, maxValueuom: newChartEvent.valueuom,
        minCharttime: newChartEvent.charttime, maxCharttime: newChartEvent.charttime,
      };
    }
    return oldEvent;
  }

  fetchNotes(admissionId: string): Observable<unknown> {
    return this.fetchService.fetch(`http://localhost:4040/visit/${admissionId}/notes`);
  }
}
