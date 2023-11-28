import { Component, OnInit } from '@angular/core';
import { Teacher } from '../entities/teacher';
import { TeacherService } from '../services/teacher.service/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})

export class TeacherDetailsComponent implements OnInit {

  teacher: Teacher = new Teacher();

  constructor(private teacherService: TeacherService, private activatedRoute: ActivatedRoute) {
    this.teacher = new Teacher();
  }

  ngOnInit(): void {
    this.loadDataTacher();
  }

  loadDataTacher() {
    let idLink: any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id::", idLink);
    this.teacherService.findById(idLink).subscribe(
      (teacherApi) => {
        console.log("teacherApi::", teacherApi);
        this.teacher = teacherApi as Teacher;
      }
    );
  }
}
