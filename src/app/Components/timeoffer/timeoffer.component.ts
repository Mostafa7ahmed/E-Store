import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timeoffer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeoffer.component.html',
  styleUrl: './timeoffer.component.scss'
})
export class TimeofferComponent implements OnInit , OnDestroy {
  targetDate: Date = new Date('2024-10-05T00:00:00'); // Set your target date here
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private countdownSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // If the countdown is finished, clear the interval
    if (distance < 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.countdownSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.countdownSubscription.unsubscribe();
  }
}
