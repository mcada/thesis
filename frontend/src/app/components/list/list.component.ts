import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue/issue.service';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues: Issue[];

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues()
    .subscribe(issues => this.issues = issues);  }

}
