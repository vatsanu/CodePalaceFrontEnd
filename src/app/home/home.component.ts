import { DateService } from './../core/services/date.service';
import { Subscription } from 'rxjs/Subscription';
import { getAllProjects } from './../project/reducers/project.selector';
import { ProjectActions } from './../project/actions/project.actions';
import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import { Project } from './../core/models/project';
import { ToastyConfig, ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProjectHttpService} from '../project/services/http/project-http.service'; 
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  projectsSub$: Subscription;
  projects: Project[];
  //trendingProjects: Project[];
  trendingProjects;
  
  message = '';

  constructor(private route: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private dateService: DateService,
    private projectservice: ProjectHttpService
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.route.queryParams.subscribe((params) => this.message = params['message']);
    // this.projectsSub$ = this.store.select(getAllProjects).subscribe((projects => this.projects = projects));
    projectservice.getProjects();

    this.getTrendingProjects();
  }

  getTrendingProjects(){
    const url = `/api/v1/projects/get_trending`;
    this.projectservice.getTrendingProjects(url).subscribe((res) => {
        console.log(res);
        this.trendingProjects = res;
        this.trendingProjects =[{id:1,title:"Ttest111"}];
     });
  }

  ngOnInit() {
    this.store.dispatch(this.projectActions.fetchAllProjects());
    this.loadScript();

    if (this.message) {
      this.toastyService.success(this.message);
    }
  }

  daysToGo(end_date) {
    return this.dateService.daysBetweenDates(new Date(), end_date);
  }

  ngOnDestroy() {
    this.projectsSub$.unsubscribe();
  }

  loadScript() {
    $('.testi-slide-2').bxSlider({
      mode: 'fade',
      auto: true
    });

    jQuery.stellar({
      horizontalScrolling: false,
      scrollProperty: 'scroll',
      positionProperty: 'position',
    });

    $('#slides').superslides({
          animation: 'fade',
        play: 8000
    });
  }
}



