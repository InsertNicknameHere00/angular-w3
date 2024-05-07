import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DragDropModule,MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FunkyNotes';
  public counter=0;
  public SelectedNoteCounter=0;
  public titleLengthMin=5;
  public descLengthMin=7;
  public LengthError=false;
  public modelTitle='';
  public modelDesc='';
  public WannaEditData=false;
  public isEditChecked=false;

  public NoteCollection:{title:string,description:string}[]= [];

public ProcessSave() {
  if(this.modelTitle.length>this.titleLengthMin && this.modelDesc.length>this.descLengthMin){
  this.NoteCollection[this.counter].title = this.modelTitle;
  this.NoteCollection[this.counter].description = this.modelDesc;
  this.resetTempData();
}else{
  console.log('Title or Description is too short');
  this.LengthError=true;
}
}

private resetTempData(){
  this.modelTitle='';
  this.modelDesc='';
  this.LengthError=false;
}

public ProcessAddNote(){
  if(this.modelTitle.length>this.titleLengthMin && this.modelDesc.length>this.descLengthMin){
  this.NoteCollection.push({title:this.modelTitle,description:this.modelDesc});
  this.LengthError=false;
  this.resetTempData();
}else{
  console.log('Title or Description is too short');
  this.LengthError=true;
}
}

  public ProcessNoteEdit(NoteElement, index) {
    this.counter = index;
    this.WannaEditData=true;
this.modelTitle=NoteElement.title;
this.modelDesc=NoteElement.description;
}

  public ProcessNoteDelete(NoteElement){
    let index = this.NoteCollection.indexOf(NoteElement);
    this.NoteCollection.splice(index,1);
    if (this.counter > this.NoteCollection.length - 1) {
      console.log('End of list');
      this.counter=0;
      this.resetTempData();
  }
}

    public ProcessEdit(index){
      this.SelectedNoteCounter=index;
      this.isEditChecked=true;
    }

    public ProcessFinishEdit(){
      this.isEditChecked=false;
      this.WannaEditData=false;
      }
  

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.NoteCollection, event.previousIndex, event.currentIndex);
  }
}
