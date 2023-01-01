import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
    id:'',
    nome:'',
    cpf:'',
    telefone:''

  }

  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(5)])
  telefone = new FormControl('',[Validators.minLength(5)])

  constructor(private router : Router,
    private service : TecnicoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.id_tec = this.route.snapshot.paramMap.get('id')!
      this.findById();
  }

  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta  => {
      this.tecnico = resposta;
    })
  }

  cancel():void{
    this.router.navigate(['tecnicos'])
  }

  update():void{
    this.service.update(this.tecnico).subscribe((resposta) =>{
      this.router.navigate(['tecnicos'])
      this.service.message('tecnico atualizado')
    },
    err =>{
       
      if(err.error.error.match('CPF JÁ CADASTRADO')){
        this.service.message(err.error.error);
      }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
        this.service.message('CPF INVÁLIDO');
      }else if(this.tecnico.nome == '' || this.tecnico.cpf == ''  || this.tecnico.telefone == ''  )
        this.service.message('Os campos não podem ser Vazios');
    })

  }



  errorValidNome(){
    if(this.nome.invalid){
      return 'nome muito curto'
    }
    return false;
  }
  errorValidCpf(){
    if(this.cpf.invalid){
      return 'cpf deve ter 11 digitos'
    }
    return false;
  }
  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'telefone deve ter no minimo 11 e 18 caracteres'
    }
    return false;
  }
}
