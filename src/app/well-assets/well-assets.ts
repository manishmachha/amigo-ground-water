import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-well-assets',
  imports: [CommonModule],
  templateUrl: './well-assets.html',
  styleUrl: './well-assets.css',
})
export class WellAssets {
  stats = [
    {
      title: 'Total Registered Wells',
      value: '12,847',
      sub: '+234 this month',
      icon: 'bi-droplet',
      bg: 'bg-blue-100',
      color: 'text-blue-600'
    },
    {
      title: 'Domestic Wells',
      value: '7,234',
      sub: '56.3% of total',
      icon: 'bi-grid',
      bg: 'bg-green-100',
      color: 'text-green-600'
    },
    {
      title: 'Agricultural Wells',
      value: '3,891',
      sub: '30.3% of total',
      icon: 'bi-graph-up-arrow',
      bg: 'bg-amber-100',
      color: 'text-amber-600'
    },
    {
      title: 'Industrial / Commercial',
      value: '1,722',
      sub: '13.4% of total',
      icon: 'bi-activity',
      bg: 'bg-purple-100',
      color: 'text-purple-600'
    },
    {
      title: 'Active Piezometers',
      value: '456',
      sub: '89% reporting',
      icon: 'bi-geo-alt',
      bg: 'bg-cyan-100',
      color: 'text-cyan-600'
    },
    {
      title: 'Recharge Structures',
      value: '2,103',
      sub: '78% operational',
      icon: 'bi-droplet-half',
      bg: 'bg-teal-100',
      color: 'text-teal-600'
    },
    {
      title: 'Wells in OE Blocks',
      value: '892',
      sub: '6.9% of total',
      icon: 'bi-exclamation-triangle',
      bg: 'bg-red-100',
      color: 'text-red-600'
    },
    {
      title: 'Registered Rigs',
      value: '167',
      sub: '12 pending renewal',
      icon: 'bi-file-earmark-text',
      bg: 'bg-indigo-100',
      color: 'text-indigo-600'
    }
  ];

  assessment = [
    { label: 'Safe', value: '6834 wells (53.2%)', width: 'w-[53%]', bar: 'bg-green-500' },
    { label: 'Semi-Critical', value: '3201 wells (24.9%)', width: 'w-[25%]', bar: 'bg-yellow-500' },
    { label: 'Critical', value: '1920 wells (14.9%)', width: 'w-[15%]', bar: 'bg-orange-500' },
    { label: 'Over-Exploited', value: '892 wells (6.9%)', width: 'w-[7%]', bar: 'bg-red-500' },
  ];

}
