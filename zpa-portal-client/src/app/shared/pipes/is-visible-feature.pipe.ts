import {Pipe, PipeTransform} from "@angular/core";
import {FeaturesService} from "../services/features.service";

@Pipe({
  name: 'isVisibleFeature'
})

export class IsVisibleFeaturePipe implements PipeTransform {
  constructor(private featureService: FeaturesService) {
  }
  transform(featureName: string): boolean {
    if (featureName) {
     return this.featureService.isVisibleFeature(featureName);
    }
    return false;
  }
}
