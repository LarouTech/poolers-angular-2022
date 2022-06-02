import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilePictureService } from 'src/app/profile-picture.service';
import { Profile } from 'src/app/profile.service';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input('isLabelVisible') isLabelVisible?: boolean;
  @Input('sizeRem') sizeRem?: string;
  @ViewChild('avatarEl') avatarEl!: ElementRef;
  profile!: Profile;
  imageUri$!: Observable<string>;

  constructor(
    private profilePictureService: ProfilePictureService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'] as Profile;
    this.imageUri$ = this.profilePictureService.signedUrl$;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.sizeRem
      ? this.renderer.setStyle(
          this.avatarEl.nativeElement,
          'height',
          this.sizeRem
        )
      : null;

    this.sizeRem
      ? this.renderer.setStyle(
          this.avatarEl.nativeElement,
          'width',
          this.sizeRem
        )
      : null;
  }
}
