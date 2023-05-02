import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private apiBaseUrl = 'api/'
  private featureList: string[] = [];

  constructor(private readonly http: HttpClient) {
    this.getAvailableFeatures();
  }

  private getAvailableFeatures(): void {
    const url = `${this.apiBaseUrl}admin/feature`;
    this.http
      .get<string[]>(url, {observe: 'response'})
      .pipe(take(1))
      .subscribe(res => {
        this.featureList = res.body || [];
      });
  }

  public isVisibleFeature(featureName: string): boolean {
    return this.featureList.includes(featureName, 0);
  }
}
