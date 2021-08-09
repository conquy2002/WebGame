<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChiTietLuotChoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chi_tiet_luot_chois', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('turn_id')->unsigned();
            $table->text('answer_clicked');
            $table->integer('point_question');
            $table->timestamps();
        });
        Schema::table('chi_tiet_luot_chois', function (Blueprint $table) {
            $table->foreign('turn_id')->references('id')->on('luot_chois');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chi_tiet_luot_chois');
    }
}
