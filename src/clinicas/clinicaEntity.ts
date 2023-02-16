
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntidade.js'

enum planosSaude {
  Sulamerica,
  Unimed,
  Bradesco,
  Amil,
  Biosaude,
  Biovida,
  Outro
}

@Entity()
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })

  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @OneToMany(() => Especialista, (especialista) => especialista.clinica)
    especialista: Relation<Especialista>

  // Para um array de enums, a documentação recomenda usar o tipo 'set' (https://dev.mysql.com/doc/refman/5.7/en/set.html)
  @Column({ type: 'set', enum: planosSaude })
    planoDeSaudeAceitos: planosSaude[]
}
