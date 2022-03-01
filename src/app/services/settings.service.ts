import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Persistence } from "../interfaces/persistence";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  persistence$: Observable<Persistence | undefined>;
  currPersistence: string = "";

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar
  ) {
    this.persistence$ = this.afs.doc<Persistence>("settings/persistence").valueChanges();

    this.persistence$.subscribe(persistence => {
      this.currPersistence = persistence !== undefined ? persistence.persistence : "";
    });
  }

  openGlobalSnackbarMessage(message: string,
                            horizontalPos: MatSnackBarHorizontalPosition = "center",
                            verticalPos: MatSnackBarVerticalPosition = "top"): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos
    })
  }

  setGlobalPersistence(persistence: string) {
    return this.afs.doc("settings/persistence").update(
      {persistence: persistence}
    );
  }
}
