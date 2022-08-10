import { Component } from '@angular/core';
import { Project } from 'src/app/Project';
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
  status: String;
  messageDisplay: String;
  searchActivate:boolean;
  searchTerm:String;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.projectList = [];
    this.status="";
    this.messageDisplay="none";
    this.searchActivate=false;
    this.searchTerm="";
  }

  ngOnInit(): void {
    this.start();
  }
  
  //Load the project list
  async start() {
    this.showMessage("Searching..");
    this.projectList = await this.projectService.getAll();
    this.hideMessage();
  }

  async search() {
    this.showMessage("Searching..");
    this.searchActivate=true;
    this.projectList = [];  //clear the list
    this.projectList = await this.projectService.search(this.searchTerm); //fill the list
    if (this.projectList.length === 0) {
      this.showMessage("No result found..");
    } else {
      this.hideMessage();
    }
    this.searchActivate=false;
  }

  //Show a message to user
  showMessage(message: string) {
    this.status=message;
    this.messageDisplay="block";
  }

  //Hide the message
  hideMessage() {
    this.status="";
    this.messageDisplay="none";
  }

}
