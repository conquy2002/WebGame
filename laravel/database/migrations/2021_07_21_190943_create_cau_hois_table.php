<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCauHoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question', function (Blueprint $table) {
            $table->increments('id');
            $table->text('content');
            $table->integer('fields_id')->unsigned();
            $table->integer('answer_id')->unsigned();
            $table->integer('point_question');
            $table->string('type');
            $table->timestamps();
        });
        Schema::table('question', function (Blueprint $table) {
            $table->foreign('fields_id')->references('id')->on('linh_vucs');
            $table->foreign('answer_id')->references('id')->on('dap_ans'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cau_hois');
    }
}
