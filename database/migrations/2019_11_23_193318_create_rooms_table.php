<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('code', 20);
            $table->unsignedInteger('size');
            $table->unsignedTinyInteger('unitSystem');
            $table->unsignedInteger('count');
            $table->boolean('extraBed');
            $table->unsignedInteger('occupancy');
            $table->unsignedTinyInteger('roomType');
            $table->boolean('wifi');
            $table->boolean('minibar');
            $table->boolean('safe');
            $table->boolean('phone');
            $table->boolean('balcony');
            $table->boolean('jacuzzi');
            $table->boolean('satellite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
