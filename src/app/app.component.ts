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

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.projectList = projectService.getAll();
  }

  async search() {
    const term = (<HTMLInputElement>document.getElementById('term')).value;   //// to be modified
    this.showMessage("Searching..");
    this.disableSearch(true);
    this.projectList = [];  //clear the list
    this.projectList = await this.projectService.search(term); //fill the list
    if (this.projectList.length === 0) {
      this.showMessage("No result found..");
    } else {
      this.hideMessage();
    }
    this.disableSearch(false);
  }

  //Disable search button and serach bar
  disableSearch(setEnable: boolean) {
    (<HTMLInputElement>document.getElementById("term")).disabled = setEnable;
    (<HTMLInputElement>document.getElementById("submit")).disabled = setEnable;
  }

  //Show a message to user
  showMessage(message: string) {
    const msgView = <HTMLElement>document.getElementById('message');
    msgView.innerHTML = message;
    msgView.style.display = 'block';
  }

  //Hide the message
  hideMessage() {
    const msgView = <HTMLElement>document.getElementById('message');
    msgView.innerHTML = '';
    msgView.style.display = 'none';
  }

}
