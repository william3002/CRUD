import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {
  // Objeto de formulario
  formulario = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl("", [Validators.required, Validators.minLength(3)])
  })

  // Visibilidade dos botões
  btnCadastrar: boolean = true

  // Vetor
  vetor: Pessoa[] = []

  // Armazenar índice da pessoa selecionada
  indice: number = -1

  // Função cadastro
  cadastrar() {

    // Cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa)

    // Limpeza dos inputs
    this.formulario.reset()

    // Visualização via console
    // TESTE console.table(this.vetor)    
  }

  // Função de seleciona
  selecionar(indice: number) {
    // Atribuir o indice da Pessoa;
    this.indice = indice

    // Atribuir os dados da pessoa no formulario
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade,
    })

    // Visibilidade dos botões
    this.btnCadastrar = false
  }

  // Função de alterar 

  alterar() {
    // Alterar o vetor
    this.vetor[this.indice] = this.formulario.value as Pessoa

    //Limpar o formulario
    this.formulario.reset

    // Visibilidade dos botões 
    this.btnCadastrar = true
  }

  // Função de remover
  remover() {
    // removendo pessoa do vetor
    this.vetor.splice(this.indice, 1)

    //Limpar o formulario
    this.formulario.reset

    // Visibilidade dos botões 
    this.btnCadastrar = true
  }

  // Função de cancelamento
  cancelar() {
    //Limpar o formulario
    this.formulario.reset

    // Visibilidade dos botões 
    this.btnCadastrar = true
  }
}
