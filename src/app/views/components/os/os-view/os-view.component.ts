import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS = {
    prioridade: '',
    observacoes: '',
    status: '',
    tecnico: '',
    cliente: ''
  }

  page = {
    decision: '/os/close'
  }

  constructor(private serivce: OsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.findById();
    
  }

  findById():void{
    this.serivce.findById(this.route.snapshot.paramMap.get('id'))
    .subscribe(reposta => {
      this.os = reposta;
    })
  }

}
