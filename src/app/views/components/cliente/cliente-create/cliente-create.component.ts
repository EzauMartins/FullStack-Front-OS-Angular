import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id:'',
    nome:'',
    cpf:'',
    telefone:''

  }

  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(5)])
  telefone = new FormControl('',[Validators.minLength(5)])

  constructor(private router : Router,
    private service : ClienteService) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.router.navigate(['clientes'])
  }

  create():void{
      this.service.create(this.cliente).subscribe((resposta) =>{
        this.router.navigate(['clientes'])
        this.service.message('Cliente Criado com sucesso')
      }, err =>{
       
        if(err.error.error.match('CPF JÁ CADASTRADO')){
          this.service.message(err.error.error);
        }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
          this.service.message('CPF INVÁLIDO');
        }else if(this.cliente.nome == '' || this.cliente.cpf == ''  || this.cliente.telefone == ''  )
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
