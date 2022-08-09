import { Component } from '@angular/core';
import { Project } from 'src/Project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Management App';
  projectList: Project[];
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.projectList = projectService.fetchData();
  }

  searchButtonAction() {
    const term = (<HTMLInputElement>document.getElementById('term')).value;
    console.log(term);
    this.projectList = this.projectService.searchProjects(term);
  }
}
