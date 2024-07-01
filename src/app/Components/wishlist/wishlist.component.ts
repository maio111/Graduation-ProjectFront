import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  cards = [
    {
      image: '../../../assets/imgs/hotel1.jpg',
      name: 'Hotel Name 1',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
      visible: true
    },
    {
      image: '../../../assets/imgs/hotel2.jpg',
      name: 'Hotel Name 2',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
      visible: true
    },
    {
      image: '../../../assets/imgs/hotel3.jpg',
      name: 'Hotel Name 3',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
      visible: true
    },
    {
      image: '../../../assets/imgs/hotel4.jpg',
      name: 'Hotel Name 4',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
      visible: true
    }
  ];

  removeCard(index: number) {
    this.cards.splice(index, 1);
  }
}
