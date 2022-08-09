import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _jsonURL = '/assets/projects.json';
  private projectList: Project[];

  constructor(private http: HttpClient) {
    this.projectList = [];
  }

  //Function used to return all the projects
  public getallProjects(): Project[] {

    this.getRequest().subscribe(data => {
      for (let i = 0; i < data.projects.length; i++) {
        this.projectList.push(new Project(data.projects[i].id, data.projects[i].name));
      }

    });
    return this.projectList;
  }

  //Funtion used to Constructs a GET request
  private getRequest(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  //Function used to filter projects;
  public async searchProjects(searchTerm: string) {

    let filteredProjects: Project[] = [];
    this.projectList.forEach(element => {
      let pName = element.name;
      if (pName.toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
        filteredProjects.push(element);
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    return filteredProjects;

  }

}
