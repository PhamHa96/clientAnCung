import { QuanAnService } from './../providers/quan-an.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailparty',
  templateUrl: './detailparty.component.html',
  styleUrls: ['./detailparty.component.scss']
})
export class DetailpartyComponent implements OnInit {
  party: any = {
  };
  constructor(private router: Router, private route: ActivatedRoute, private _quananService: QuanAnService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = (params['_id'] as string);
      this._quananService.getPartyByID(id).subscribe(party => {
        this.party = party;
        console.log('this.party', this.party);
      });
    });
  }

}
