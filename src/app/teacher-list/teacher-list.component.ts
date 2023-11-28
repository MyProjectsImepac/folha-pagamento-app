import { Component, OnInit } from '@angular/core';
import { Teacher } from '../entities/teacher';
import { Observable } from 'rxjs';
import { TeacherService } from '../services/teacher.service/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})

export class TeacherListComponent implements OnInit {

  teachers: Teacher[] = [];
  hasTeachersEmpty: boolean = true;

  constructor(private teacherService: TeacherService, router: Router) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.teacherService.findAll().subscribe(
      teacherApi => {
        this.teachers = teacherApi as Teacher[];
        this.hasTeachersEmpty = this.teachers.length == 0;
        console.log("this.teachers::", this.teachers);
      }
    );
  }

  deleteTeacher(id: number) {
    this.teacherService.delete(id);
    location.reload();
  }

}
