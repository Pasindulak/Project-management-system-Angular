import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Project } from 'src/app/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectURL = '/assets/projectss.json';
  private projectList: Project[];

  constructor(private http: HttpClient) {
    this.projectList = [];
  }

  //Return all the projects
  public getAll(): Observable<any> {

    let REQUEST: Observable<any> = this.http.get(this.projectURL);

    REQUEST = REQUEST.pipe(map(data => {
      for (let i = 0; i < data.projects.length; i++) {
        this.projectList.push(new Project(data.projects[i].id, data.projects[i].name));
      }
      return this.projectList;
    }));

    return REQUEST;
  }

  //return filtered project list
  public async search(searchTerm: String) {

    let filteredProjects: Project[] = [];
    filteredProjects = this.projectList.filter((project: Project) => { return (project.name.toLowerCase().search(searchTerm.toLowerCase()) >= 0) });
    //await new Promise(r => setTimeout(r, 600));
    return filteredProjects;

  }

}
